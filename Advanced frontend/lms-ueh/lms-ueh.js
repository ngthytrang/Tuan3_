(async function () {
  // Moodle có thể cung cấp jQuery qua RequireJS thay vì window.jQuery.
  const $ = window.jQuery || await new Promise(resolve => {
    if (typeof window.requirejs !== 'function') {
      resolve(null);
      return;
    }
    window.requirejs(['jquery'], resolve, () => resolve(null));
  });

  if (!$) {
    console.error('Không tìm thấy jQuery trên trang này.');
    return;
  }

  const text = value => value.replace(/\s+/g, ' ').trim();
  const assignmentSelector = '.modtype_assign, [data-activityname="assign"]';
  const dueLabel = /^(hạn(?: chót| nộp)?|đến hạn|ngày hết hạn|due(?: date)?|deadline)\s*[:：]?\s*$/i;
  const dueLine = /^(?:hạn(?: chót| nộp)?|đến hạn|ngày hết hạn|due(?: date)?|deadline)\s*[:：]\s*(.+)$/i;
  const sectionSelector = 'li.section, [data-for="section"], .course-section';

  function readDeadline($scope) {
    const explicitlyMarked = $scope.find('[data-region="due-date"], time[data-type="due"]').first();
    if (text(explicitlyMarked.text())) return text(explicitlyMarked.text());

    let deadline = '';
    $scope.find('tr, .activity-dates > div, [data-region="activity-dates"] > div').each(function () {
      const $row = $(this);
      const $label = $row.children('th, strong, b, .font-weight-bold, .fw-bold').first();
      if ($label.length && dueLabel.test(text($label.text()))) {
        const $value = $row.children('td').last();
        deadline = text($value.length ? $value.text() : $row.text().slice($label.text().length));
      }
      deadline ||= text($row.text()).match(dueLine)?.[1] || '';
      if (deadline) return false;
    });
    return deadline;
  }

  const $course = $('#region-main').length ? $('#region-main') : $(document);
  const assignments = $course.find(assignmentSelector).toArray().map(element => {
    const $activity = $(element);
    const $title = $activity.find('.instancename, .activityname a').first().clone();
    $title.find('.accesshide, .sr-only, .visually-hidden').remove();
    return {
      element,
      name: text($title.text()) || $activity.attr('data-activityname') || 'Bài tập chưa rõ tên',
      url: $activity.find('a[href*="/mod/assign/view.php"]').first().attr('href'),
      deadline: readDeadline($activity)
    };
  });

  if (assignments.length >= 5) console.log('Bài nộp thứ 5:', assignments[4].name);
  else console.info(`Tìm thấy ${assignments.length} bài nộp. Trang hiện tại chưa có bài nộp thứ 5.`);

  async function fillDeadline(assignment) {
    if (assignment.deadline || !assignment.url) return;
    const url = new URL(assignment.url, location.href);
    if (url.origin !== location.origin) return;
    try {
      const html = await $.ajax({ url: url.href, dataType: 'text' });
      const page = new DOMParser().parseFromString(html, 'text/html');
      assignment.deadline = readDeadline($(page).find('#region-main'));
    } catch {
      assignment.deadline = 'Không đọc được hạn nộp';
    }
  }

  const sections = $course.find(sectionSelector).toArray().filter(element =>
    $(element).find('.sectionname, .section-title, [data-for="section_title"], h2, h3, h4').length ||
    assignments.some(item => $(item.element).closest(sectionSelector)[0] === element)
  );

  const topics = sections.map((element, index) => {
    const $title = $(element).find('.sectionname, .section-title, [data-for="section_title"], h2, h3, h4').filter(function () {
      return $(this).closest(sectionSelector)[0] === element && !$(this).closest(assignmentSelector).length;
    }).first().clone();
    $title.find('.accesshide, .sr-only, .visually-hidden').remove();
    return {
      name: text($title.text()) || `Chủ đề ${index + 1}`,
      assignments: assignments.filter(item => $(item.element).closest(sectionSelector)[0] === element)
    };
  });

  const ungrouped = assignments.filter(item => !$(item.element).closest(sectionSelector).length);
  if (ungrouped.length) topics.push({ name: 'Chưa xác định được chủ đề', assignments: ungrouped });

  for (const assignment of assignments) await fillDeadline(assignment);

  const rows = topics.flatMap(topic => topic.assignments.length
    ? topic.assignments.map(item => ({
      'Chủ đề': topic.name,
      'Có bài tập': 'Có',
      'Bài tập': item.name,
      'Hạn nộp': item.deadline || 'Không thấy hạn nộp'
    }))
    : [{ 'Chủ đề': topic.name, 'Có bài tập': 'Không', 'Bài tập': '—', 'Hạn nộp': '—' }]);

  if (rows.length) console.table(rows);
  else console.warn('Không tìm thấy chủ đề. Hãy mở trang tổng quan của môn học.');

  // Demo dùng cùng kết quả với Console để hiển thị bảng trên trang.
  const output = document.getElementById('lms-demo-results');
  if (output) {
    $(output).find('p').text(assignments.length >= 5 ? `Bài nộp thứ 5: ${assignments[4].name}` : 'Chưa có bài nộp thứ 5.');
    const $body = $(output).find('tbody').empty();
    rows.forEach(row => {
      const $line = $('<tr>');
      Object.values(row).forEach(value => $('<td>').text(value).appendTo($line));
      $body.append($line);
    });
    output.hidden = false;
  }
})();
