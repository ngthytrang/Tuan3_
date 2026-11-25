const path = require('node:path');

function memoryStore() {
    const tasks = [];
    let nextId = 1;

    return {
        list: date => date ? tasks.filter(task => task.dueDate === date) : tasks,
        create(fields) {
            const task = { ...fields, id: nextId++, done: false };
            tasks.push(task);
            return task;
        },
        edit(id, fields) {
            const task = tasks.find(task => task.id === id);
            return task && Object.assign(task, fields);
        },
        complete(id, done) {
            return this.edit(id, { done });
        },
        remove(id) {
            const index = tasks.findIndex(task => task.id === id);
            if (index === -1) return false;
            tasks.splice(index, 1);
            return true;
        },
    };
}

function sqliteStore() {
    const { DatabaseSync } = require('node:sqlite');
    const db = new DatabaseSync(process.env.TODO_DB_PATH || path.join(__dirname, 'tasks.sqlite'));
    db.exec('PRAGMA busy_timeout = 5000; BEGIN IMMEDIATE');
    try {
        db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                due_date TEXT NOT NULL,
                due_time TEXT NOT NULL DEFAULT '',
                done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1))
            ) STRICT;
            CREATE INDEX IF NOT EXISTS tasks_due_date ON tasks(due_date);
        `);
        const existing = new Set(db.prepare('PRAGMA table_info(tasks)').all().map(column => column.name));
        const additions = [
            ['category', "TEXT NOT NULL DEFAULT 'Khác'"],
            ['priority', "TEXT NOT NULL DEFAULT 'Vừa'"],
            ['notes', "TEXT NOT NULL DEFAULT ''"],
        ];
        for (const [name, definition] of additions) {
            if (!existing.has(name)) db.exec(`ALTER TABLE tasks ADD COLUMN ${name} ${definition}`);
        }
        db.exec('COMMIT');
    } catch (error) {
        db.exec('ROLLBACK');
        db.close();
        throw error;
    }

    const columns = "id, name, due_date AS dueDate, due_time AS time, done, COALESCE(category, 'Khác') AS category, COALESCE(priority, 'Vừa') AS priority, COALESCE(notes, '') AS notes";
    const list = db.prepare(`SELECT ${columns} FROM tasks WHERE due_date = ? ORDER BY id`);
    const listAll = db.prepare(`SELECT ${columns} FROM tasks ORDER BY id`);
    const create = db.prepare(`
        INSERT INTO tasks (name, due_date, due_time, category, priority, notes)
        VALUES (?, ?, ?, ?, ?, ?) RETURNING ${columns}
    `);
    const edit = db.prepare(`
        UPDATE tasks SET name = ?, due_date = ?, due_time = ?,
            category = COALESCE(?, category), priority = COALESCE(?, priority), notes = COALESCE(?, notes)
        WHERE id = ? RETURNING ${columns}
    `);
    const complete = db.prepare(`UPDATE tasks SET done = ? WHERE id = ? RETURNING ${columns}`);
    const remove = db.prepare('DELETE FROM tasks WHERE id = ?');
    const asTask = row => row && { ...row, done: Boolean(row.done) };

    return {
        list: date => (date ? list.all(date) : listAll.all()).map(asTask),
        create: ({ name, dueDate, time, category, priority, notes }) =>
            asTask(create.get(name, dueDate, time, category, priority, notes)),
        edit: (id, { name, dueDate, time, category = null, priority = null, notes = null }) =>
            asTask(edit.get(name, dueDate, time, category, priority, notes, id)),
        complete: (id, done) => asTask(complete.get(Number(done), id)),
        remove: id => remove.run(id).changes === 1,
    };
}

module.exports = { memoryStore, sqliteStore };
