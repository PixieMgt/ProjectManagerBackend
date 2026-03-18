# Project Manager
ProjectManager is a full-stack SaaS platform for freelance and small-team developers to manage software projects. Users can track clients, projects, tasks, time and invoices while also integrating with Git repositories to view commits, pull requests and development statuses. The platform is built with Next.js (frontend), Express.js (backend), Microsoft SQL Server (database) and can be containerized with Docker and orchestrated with Kubernetes for production-scale deployment.

## Database
### users
- id **bigint** IDENTITY(1,1) PK
- name **varchar(255)** NOT NULL
- email **varchar(255)** NOT NULL UNIQUE
- password_hash **varchar(255)** NOT NULL
- role **varchar(50)** NOT NULL CHECK (role IN (‘admin’,‘developer’,‘client’))
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- updated_at **datetime2**
### clients
- id **bigint** IDENTITY(1,1) PK
- name **varchar(255)** NOT NULL
- company **varchar(255)**
- email **varchar(255)**
- phone **varchar(50)**
- notes **varchar(MAX)**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- updated_at **datetime2**
### projects
- id **bigint** IDENTITY(1,1) PK
- client_id **bigint** NOT NULL (FK -> clients.id)
- owner_user_id **bigint** NOT NULL (FK -> users.id)
- name **varchar(255)** NOT NULL
- description **varchar(MAX)**
- status **varchar(50)** NOT NULL CHECK (status IN (‘planning’,’active’,’completed’,’archived’)) DEFAULT ‘planning’
- hourly_rate **decimal(10,2)**
- start_date **date**
- deadline **date**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- updated_at **datetime2**
### project_members
- id **bigint** IDENTITY(1,1) PK
- project_id **bigint** NOT NULL (FK -> projects.id)
- idx_project_members_project INDEX ON (project_id)
- user_id **bigint** NOT NULL (FK -> users.id)
- idx_project_members_user INDEX ON (user_id)
- role **varchar(50)** NOT NULL CHECK (role IN (‘owner’,’maintainer’,’developer’,’viewer’))
- joined_at **datetime2**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- UNIQUE (project_id, user_id)
### tasks
- id **bigint** IDENTITY(1,1) PK
- project_id **bigint** NOT NULL (FK -> projects.id)
- idx_tasks_project INDEX ON (project_id)
- owner_user_id **bigint** NOT NULL (FK -> users.id)
- title **varchar(255)** NOT NULL
- description **varchar(MAX)**
- status **varchar(50)** NOT NULL CHECK (status IN (‘todo’,’in_progress’,’review’,’done’)) DEFAULT ‘todo’
- priority **varchar(50)** NOT NULL CHECK (priority IN (‘low’,’medium’,’high’,’critical’)) DEFAULT ‘medium’
- estimated_hours **decimal(6,2)**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- updated_at **datetime2**
### time_entries
- id **bigint** IDENTITY(1,1) PK
- task_id **bigint** NOT NULL(FK -> tasks.id)
- idx_time_entries_task INDEX ON (task_id)
- user_id **bigint** NOT NULL (FK -> users.id)
- idx_time_entries_user INDEX ON (user_id)
- start_time **datetime2**
- end_time **datetime2**
- duration_minutes **int** AS DATEDIFF(MINUTE, start_time, end_time)
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
### repositories
- id **bigint** IDENTITY(1,1) PK
- owner_user_id **bigint** NOT NULL (FK -> users.id)
- provider **varchar(50)** NOT NULL CHECK (provider IN (‘github’)
- external_id **varchar(255)** NOT NULL
- name **varchar(255)**
- url **varchar(255)** NOT NULL
- default_branch **varchar(255)**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- UNIQUE (provider, external_id)
### project_repositories
- id **bigint** IDENTITY(1,1) PK
- project_id **bigint** NOT NULL (FK -> projects.id)
- idx_project_repositories_project INDEX
- repository_id **bigint** NOT NULL (FK -> repositories.id)
- UNIQUE (project_id, repository_id)
### integrations
- id **bigint** IDENTITY(1,1) PK
- user_id **bigint** NOT NULL (FK -> users.id)
- provider **varchar(50)** NOT NULL CHECK (provider IN (‘github’))
- access_token_hash **varchar(MAX)** NOT NULL
- refresh_token_hash **varchar(MAX)** NOT NULL
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
### commits
- id **bigint** IDENTITY(1,1) PK
- repository_id **bigint** NOT NULL (FK -> repositories.id)
- idx_commits_repo INDEX ON (repository_id)
- author_user_id **bigint** NOT NULL (FK -> users.id)
- idx_commits_author INDEX ON (author_user_id)
- commit_hash **varchar(255)** NOT NULL
- message **varchar(MAX)**
- commit_date **datetime2** NOT NULL
- UNIQUE (repository_id, commit_hash)
### task_commits
- id **bigint** IDENTITY(1,1) PK
- task_id **bigint** NOT NULL (FK -> tasks.id)
- idx_task_commits_task INDEX ON (task_id)
- commit_id **bigint** NOT NULL (FK -> commits.id)
- idx_task_commits_commit INDEX ON (commit_id)
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- UNIQUE (task_id, commit_id)
### pull_requests
- id **bigint** IDENTITY(1,1) PK
- repository_id **bigint** NOT NULL (FK -> repositories.id)
- idx_pull_requests_repo INDEX ON (repository_id)
- author_user_id **bigint** NOT NULL (FK -> users.id)
- external_id **varchar(MAX)** NOT NULL
- title **varchar(255)**
- status **varchar(50)** NOT NULL CHECK (status IN (‘open’,’draft’,’review’,’approved’,’merged’,’closed’)) DEFAULT ‘open’
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- merged_at **datetime2**
- closed_at **datetime2**
### deployments
- id **bigint** IDENTITY(1,1) PK
- project_id **bigint** NOT NULL (FK -> projects.id)
- idx_deployments_project INDEX ON (project_id)
- commit_id **bigint** NOT NULL (FK -> commits.id)
- environment **varchar(50)** NOT NULL CHECK (environment IN (‘dev’,’staging’,’production’)) DEFAULT ‘dev’
- deployment_url **varchar(MAX)** NOT NULL
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
### invoices
- id **bigint** IDENTITY(1,1) PK
- client_id **bigint** NOT NULL (FK -> clients.id)
- idx_invoices_client INDEX ON (client_id)
- project_id **bigint** NOT NULL (FK -> projects.id)
- idx_invoices_project INDEX ON (project_id)
- status **varchar(50)** NOT NULL CHECK (status IN (‘draft’,’sent’,’paid’,’overdue’)) DEFAULT ‘draft’
- issue_date **date**
- due_date **date**
- total_amount **decimal(12,2)**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- updated_at **datetime2**
### invoice_items
- id **bigint** IDENTITY(1,1) PK
- invoice_id **bigint** NOT NULL (FK -> invoices.id)
- description **varchar(MAX)**
- quantity **decimal(10,2)** NOT NULL
- unit_price **decimal(10,2)** NOT NULL
- total **decimal(10,2)** NOT NULL AS (quantity * unit_price)
### project_docs
- id **bigint** IDENTITY(1,1) PK
- project_id **bigint** NOT NULL (FK -> projects.id)
- title **varchar(255)**
- content **varchar(MAX)**
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- updated_at **datetime2**
### activities
- id **bigint** IDENTITY(1,1) PK
- user_id **bigint** NOT NULL (FK -> users.id)
- idx_activities_user INDEX ON (user_id)
- project_id **bigint** NOT NULL (FK -> projects.id)
- idx_activities_project INDEX ON (project_id)
- entity_type **varchar(50)** NOT NULL CHECK (entity_type IN (‘project’,’task’,’commit’,’pull_request’,’deployment’,’repository’,’invoice’,’time_entry’,’document’,’member’))
- action **varchar(50)** NOT NULL CHECK (action IN (‘created’,’updated’,’deleted’,’assigned’,’unassigned’,’linked’,’unlinked’,’commented’,’deployed’,’merged’,’closed’,’reopened’,’started’,’stopped’))
- metadata **varchar(MAX)** NOT NULL
- created_at **datetime2** NOT NULL DEFAULT GETDATE()
- idx_activities_project_created INDEX ON (project_id, created_at)

## API Endpoints
### authentication
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me
- POST /auth/refresh
### users
- GET /users
- GET /users/:id
- POST /users
- PATCH /users/:id
- DELETE /users/:id
- GET /users/:id/projects
- GET /users/:id/time-entries
- GET /users/:id/activities
- GET /users/:id/tasks
### clients
- GET /clients
- GET /clients/:id
- POST /clients
- PATCH /clients/:id
- DELETE /clients/:id
- GET /clients/:id/projects
- GET /clients/:id/invoices
### projects
- GET /projects
- GET /projects/:id
- POST /projects
- PATCH /projects/:id
- DELETE /projects/:id
- GET /projects/:id/members
- POST /projects/:id/members
- PATCH /projects/:projectId/members/:userId
- DELETE /projects/:projectId/members/:userId
- GET /projects/:id/tasks
- GET /projects/:id/activities
- GET /projects/:id/docs
- GET /projects/:id/deployments
- GET /projects/:id/invoices
- GET /projects/:id/repositories
- POST /projects/:id/repositories
- DELETE /projects/:projectId/repositories/:repoId
### tasks
- GET /tasks
- GET /tasks/:id
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id
- GET /tasks/:id/time-entries
- GET /tasks/:id/commits
- POST /tasks/:id/commits
- DELETE /tasks/:taskId/commits/:commitId
### time-entries
- GET /time-entries
- GET /time-entries/:id
- POST /time-entries
- PATCH /time-entries/:id
- DELETE /time-entries/:id
### repositories
- GET /repositories
- GET /repositories/:id
- POST /repositories
- DELETE /repositories/:id
- GET /repositories/:id/commits
- GET /repositories/:id/pull-requests
### commits
- GET /commits/:id
### pull-requests
- GET /pull-requests/:id
### deployments
- GET /deployments
- GET /deployments/:id
- POST /deployments
### invoices
- GET /invoices
- GET /invoices/:id
- POST /invoices
- PATCH /invoices/:id
- DELETE /invoices/:id
- POST /invoices/:id/items
- PATCH /invoices/:invoiceId/items/:itemId
- DELETE /invoices/:invoiceId/items/:itemId
### documents
- GET /documents/:id
- POST /documents
- PATCH /documents/:id
- DELETE /documents/:id
### activities
- GET /activities
### integrations
- GET /integrations
- DELETE /integrations/:id
- POST /integrations/github/connect
- POST /integrations/github/callback

## SQL table creations
-- ===========================
-- USERS
-- ===========================
CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin','developer','client')),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2
);

-- ===========================
-- CLIENTS
-- ===========================
CREATE TABLE clients (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    notes VARCHAR(MAX),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2
);

-- ===========================
-- PROJECTS
-- ===========================
CREATE TABLE projects (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    client_id BIGINT NOT NULL,
    owner_user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(MAX),
    status VARCHAR(50) NOT NULL 
        CHECK (status IN ('planning','active','completed','archived')) 
        DEFAULT 'planning',
    hourly_rate DECIMAL(10,2),
    start_date DATE,
    deadline DATE,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

-- ===========================
-- PROJECT MEMBERS
-- ===========================
CREATE TABLE project_members (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    project_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner','maintainer','developer','viewer')),
    joined_at DATETIME2,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    UNIQUE (project_id, user_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_project_members_project ON project_members(project_id);
CREATE INDEX idx_project_members_user ON project_members(user_id);

-- ===========================
-- TASKS
-- ===========================
CREATE TABLE tasks (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    project_id BIGINT NOT NULL,
    owner_user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(MAX),
    status VARCHAR(50) NOT NULL 
        CHECK (status IN ('todo','in_progress','review','done')) 
        DEFAULT 'todo',
    priority VARCHAR(50) NOT NULL 
        CHECK (priority IN ('low','medium','high','critical')) 
        DEFAULT 'medium',
    estimated_hours DECIMAL(6,2),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

CREATE INDEX idx_tasks_project ON tasks(project_id);

-- ===========================
-- TIME ENTRIES
-- ===========================
CREATE TABLE time_entries (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    task_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    start_time DATETIME2,
    end_time DATETIME2,
    duration_minutes AS DATEDIFF(MINUTE, start_time, end_time),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_time_entries_task ON time_entries(task_id);
CREATE INDEX idx_time_entries_user ON time_entries(user_id);

-- ===========================
-- REPOSITORIES
-- ===========================
CREATE TABLE repositories (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    owner_user_id BIGINT NOT NULL,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('github')),
    external_id VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    default_branch VARCHAR(255),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    UNIQUE (provider, external_id),
    FOREIGN KEY (owner_user_id) REFERENCES users(id)
);

-- ===========================
-- PROJECT REPOSITORIES
-- ===========================
CREATE TABLE project_repositories (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    project_id BIGINT NOT NULL,
    repository_id BIGINT NOT NULL,
    UNIQUE (project_id, repository_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (repository_id) REFERENCES repositories(id)
);

CREATE INDEX idx_project_repositories_project ON project_repositories(project_id);

-- ===========================
-- INTEGRATIONS
-- ===========================
CREATE TABLE integrations (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('github')),
    access_token_hash VARCHAR(MAX) NOT NULL,
    refresh_token_hash VARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ===========================
-- COMMITS
-- ===========================
CREATE TABLE commits (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    repository_id BIGINT NOT NULL,
    author_user_id BIGINT NOT NULL,
    commit_hash VARCHAR(255) NOT NULL,
    message VARCHAR(MAX),
    commit_date DATETIME2 NOT NULL,
    UNIQUE (repository_id, commit_hash),
    FOREIGN KEY (repository_id) REFERENCES repositories(id),
    FOREIGN KEY (author_user_id) REFERENCES users(id)
);

CREATE INDEX idx_commits_repo ON commits(repository_id);
CREATE INDEX idx_commits_author ON commits(author_user_id);

-- ===========================
-- TASK COMMITS
-- ===========================
CREATE TABLE task_commits (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    task_id BIGINT NOT NULL,
    commit_id BIGINT NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    UNIQUE (task_id, commit_id),
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (commit_id) REFERENCES commits(id)
);

CREATE INDEX idx_task_commits_task ON task_commits(task_id);
CREATE INDEX idx_task_commits_commit ON task_commits(commit_id);

-- ===========================
-- PULL REQUESTS
-- ===========================
CREATE TABLE pull_requests (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    repository_id BIGINT NOT NULL,
    author_user_id BIGINT NOT NULL,
    external_id VARCHAR(MAX) NOT NULL,
    title VARCHAR(255),
    status VARCHAR(50) NOT NULL 
        CHECK (status IN ('open','draft','review','approved','merged','closed')) 
        DEFAULT 'open',
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    merged_at DATETIME2,
    closed_at DATETIME2,
    FOREIGN KEY (repository_id) REFERENCES repositories(id),
    FOREIGN KEY (author_user_id) REFERENCES users(id)
);

CREATE INDEX idx_pull_requests_repo ON pull_requests(repository_id);

-- ===========================
-- DEPLOYMENTS
-- ===========================
CREATE TABLE deployments (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    project_id BIGINT NOT NULL,
    commit_id BIGINT NOT NULL,
    environment VARCHAR(50) NOT NULL 
        CHECK (environment IN ('dev','staging','production')) 
        DEFAULT 'dev',
    deployment_url VARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (commit_id) REFERENCES commits(id)
);

CREATE INDEX idx_deployments_project ON deployments(project_id);

-- ===========================
-- INVOICES
-- ===========================
CREATE TABLE invoices (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    client_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL 
        CHECK (status IN ('draft','sent','paid','overdue')) 
        DEFAULT 'draft',
    issue_date DATE,
    due_date DATE,
    total_amount DECIMAL(12,2),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_project ON invoices(project_id);

-- ===========================
-- INVOICE ITEMS
-- ===========================
CREATE TABLE invoice_items (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    invoice_id BIGINT NOT NULL,
    description VARCHAR(MAX),
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total AS (quantity * unit_price),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);

-- ===========================
-- PROJECT DOCS
-- ===========================
CREATE TABLE project_docs (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    project_id BIGINT NOT NULL,
    title VARCHAR(255),
    content VARCHAR(MAX),
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- ===========================
-- ACTIVITIES
-- ===========================
CREATE TABLE activities (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN 
        ('project','task','commit','pull_request','deployment','repository','invoice','time_entry','document','member')),
    action VARCHAR(50) NOT NULL CHECK (action IN 
        ('created','updated','deleted','assigned','unassigned','linked','unlinked','commented','deployed','merged','closed','reopened','started','stopped')),
    metadata VARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_project ON activities(project_id);
CREATE INDEX idx_activities_project_created ON activities(project_id, created_at);

## SQL seed data
------------------------------------------------------------
-- USERS
------------------------------------------------------------
INSERT INTO users (name, email, password_hash, role)
VALUES
('Alice Admin', 'alice@example.com', 'hash_admin', 'admin'),
('Bob Developer', 'bob@example.com', 'hash_bob', 'developer'),
('Charlie Client', 'charlie@example.com', 'hash_charlie', 'client');

------------------------------------------------------------
-- CLIENTS
------------------------------------------------------------
INSERT INTO clients (name, company, email, phone, notes)
VALUES
('Charlie Client', 'ClientCorp', 'charlie@example.com', '555-1234', 'VIP client'),
('Delta Industries', 'Delta Industries', 'contact@delta.com', '555-9876', 'Long-term partner');

------------------------------------------------------------
-- PROJECTS
------------------------------------------------------------
INSERT INTO projects (client_id, owner_user_id, name, description, status, hourly_rate, start_date, deadline)
VALUES
(1, 1, 'Website Redesign', 'Full redesign of corporate website', 'active', 75.00, '2024-01-01', '2024-04-01'),
(2, 2, 'Mobile App', 'iOS + Android application', 'planning', 90.00, '2024-02-15', '2024-06-30');

------------------------------------------------------------
-- PROJECT MEMBERS
------------------------------------------------------------
INSERT INTO project_members (project_id, user_id, role)
VALUES
(1, 1, 'owner'),
(1, 2, 'developer'),
(2, 2, 'owner');

------------------------------------------------------------
-- TASKS
------------------------------------------------------------
INSERT INTO tasks (project_id, owner_user_id, title, description, status, priority, estimated_hours)
VALUES
(1, 2, 'Create wireframes', 'Initial UX wireframes', 'in_progress', 'medium', 12),
(1, 2, 'Implement homepage', 'Build responsive homepage', 'todo', 'high', 20),
(2, 2, 'Set up project structure', 'Initialize repo + CI', 'todo', 'medium', 8);

------------------------------------------------------------
-- TIME ENTRIES
------------------------------------------------------------
INSERT INTO time_entries (task_id, user_id, start_time, end_time)
VALUES
(1, 2, '2024-03-01 09:00', '2024-03-01 12:00'),
(1, 2, '2024-03-02 10:00', '2024-03-02 13:30'),
(2, 2, '2024-03-03 14:00', '2024-03-03 17:00');

------------------------------------------------------------
-- REPOSITORIES
------------------------------------------------------------
INSERT INTO repositories (owner_user_id, provider, external_id, name, url, default_branch)
VALUES
(2, 'github', 'repo123', 'website-redesign', 'https://github.com/example/website-redesign', 'main'),
(2, 'github', 'repo456', 'mobile-app', 'https://github.com/example/mobile-app', 'main');

------------------------------------------------------------
-- PROJECT REPOSITORIES
------------------------------------------------------------
INSERT INTO project_repositories (project_id, repository_id)
VALUES
(1, 1),
(2, 2);

------------------------------------------------------------
-- COMMITS
------------------------------------------------------------
INSERT INTO commits (repository_id, author_user_id, commit_hash, message, commit_date)
VALUES
(1, 2, 'abc123', 'Initial commit', '2024-03-01'),
(1, 2, 'def456', 'Added homepage layout', '2024-03-02'),
(2, 2, 'xyz789', 'Initial mobile app setup', '2024-03-05');

------------------------------------------------------------
-- TASK COMMITS
------------------------------------------------------------
INSERT INTO task_commits (task_id, commit_id)
VALUES
(1, 1),
(2, 2);

------------------------------------------------------------
-- PULL REQUESTS
------------------------------------------------------------
INSERT INTO pull_requests (repository_id, author_user_id, external_id, title, status)
VALUES
(1, 2, 'pr001', 'Homepage layout PR', 'review'),
(2, 2, 'pr002', 'Initial mobile app PR', 'open');

------------------------------------------------------------
-- DEPLOYMENTS
------------------------------------------------------------
INSERT INTO deployments (project_id, commit_id, environment, deployment_url)
VALUES
(1, 2, 'staging', 'https://staging.example.com'),
(2, 3, 'dev', 'https://dev.example.com');

------------------------------------------------------------
-- INVOICES
------------------------------------------------------------
INSERT INTO invoices (client_id, project_id, status, issue_date, due_date, total_amount)
VALUES
(1, 1, 'sent', '2024-03-01', '2024-03-15', 1500.00),
(2, 2, 'draft', '2024-03-05', '2024-03-20', 800.00);

------------------------------------------------------------
-- INVOICE ITEMS
------------------------------------------------------------
INSERT INTO invoice_items (invoice_id, description, quantity, unit_price)
VALUES
(1, 'Wireframing work', 10, 75),
(1, 'Homepage development', 10, 75),
(2, 'Initial setup', 8, 100);

------------------------------------------------------------
-- PROJECT DOCS
------------------------------------------------------------
INSERT INTO project_docs (project_id, title, content)
VALUES
(1, 'Project Overview', 'This document describes the website redesign project.'),
(2, 'Architecture Plan', 'This document outlines the mobile app architecture.');

------------------------------------------------------------
-- ACTIVITIES
------------------------------------------------------------
INSERT INTO activities (user_id, project_id, entity_type, action, metadata)
VALUES
(2, 1, 'task', 'created', '{"task":"Create wireframes"}'),
(2, 1, 'commit', 'linked', '{"commit":"abc123"}'),
(1, 1, 'project', 'updated', '{"status":"active"}');
