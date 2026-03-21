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
- role **varchar(50)** NOT NULL CHECK (role IN (‘owner’,’developer’,’tester’,’viewer’))
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
- comment **varchar(MAX)**
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
- GET /projects/:id/invoices
- GET /projects/:id/activities
- GET /projects/:id/docs
- GET /projects/:id/deployments
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
- GET /invoices/:id/items
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
