# CaSMM

> Computation and Science Modeling through Making

Cloud-based programming interface

![Deploy Staging](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Staging/badge.svg)
![Deploy Production](https://github.com/STEM-C/CaSMM/workflows/Deploy%20Production/badge.svg)

## What's new?

This fork of CASMM was worked on by CEN3031 Team 2d. Our goal with this fork was to begin implementing a new Administrator role in the backend and provide an intuitive web frontend for administrators to manage all aspects of their schools.

### Features Implemented

- Administrator role created in the backend.
- Administrators gain access to the Administrator Dashboard upon logging in.
  - Schools, classrooms, teachers, students, and lessons can all be managed through the Administrator dashboard.
  - This includes creating, viewing, and editing associated database entries.
  - Faculty and student rosters can be uploaded as CSV files to easily populate schools or classrooms.
  - The dashboard features sorting, searching, and pagination to help administrators find what they need quickly. 

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Administrator Dashboard
![Administrator Dashboard](docs/admin_dashboard.png)

#### Creating new database entries
![Schol Creator](docs/school_creator.png)

#### Editing Existing database entries (`Edit Details`)
![School Editor](docs/school_editor.png)

#### Editing students assigned to classrooms in a specific school (`Edit Students`)
![School Studnet Editor](docs/school_students.png)

#### Faculty Upload
![Faculty Upload Window](docs/faculty_upload.png)

</details>

### Running locally

If you have never run CASMM on your local machine, you can follow the directions below from the original repo to run the frontend using yarn and the backend using Docker. 

If you have run CASMM before, you will need to delete your casmm-db-dev container and rerun Docker Compose. This way, your local development database will be rebuilt to include the Administrator role and a relation between schools and administrators. We have also added a sample Admin user with username `admin` and password `easypassword`.

### Remaining Work

Our sprints during the Fall 2023 semester mostly focused on creating the interface for administrators to interact with the database. This work is done, however there is still work that must be put in on the backend before this can be put into production. Currently, our admin dashboard requests every school, classroom, teacher, and lesson available in the database. This is insecure because administrators should only be able to access data associated with schools that they belong to. We have added a relation between administrators and schools, but currently no queries utilize this. Checking the administrator's associated schools to only provide them with relevant data could be implemented as a Strapi policy.

We also have a tab in the administrator dashboard dedicated to moderation tasks. Since moderation was not implemented when we started designing the dashboard, this tab has some placeholder tables and buttons. If the work for the moderation team gets merged in, this tab could be populated with content requiring a moderator's attention.

### Credits

Our changes brought in no new libraries or dependencies compared to upstream CASMM. You can read more about the libraries used for each component of CASMM below.

<br/>

## Application

### `client` 
[client](/client#client) is the frontend of the application. It is powered by [React](https://reactjs.org/) and [Blockly](https://developers.google.com/blockly).

### `server`

[server](/server#server) is the web server and application server. It is powered by [Node](https://nodejs.org/en/) and [Strapi](https://docs-v3.strapi.io/developer-docs/latest/getting-started/introduction.html).

### `compile`

  [compile](/compile#compile) is an arduino compiler service. It is an unofficial fork of [Chromeduino](https://github.com/spaceneedle/Chromeduino).

<br/>

## Environments

> The project is divided into three conceptual environments.

### Development
#### Structure

The development environment is composed of five servers. The first one is run with the [Create React App](https://create-react-app.dev/docs/getting-started/) dev server. The later four are containerized with docker and run with [docker compose](https://docs.docker.com/compose/).

* `casmm-client-dev` - localhost:3000

* `casmm-server-dev` - localhost:1337/admin

* `casmm-compile-dev` 

* `casmm-db-dev` - localhost:5432

  > The first time the db is started, the [init_db.sh](/scripts/init_db.sh) script will run and seed the database with an environment specific dump. Read about Postgres initialization scripts [here](https://github.com/docker-library/docs/blob/master/postgres/README.md#initialization-scripts). To see how to create this dump, look [here](https://github.com/DavidMagda/CaSMM_fork_2023/blob/develop/scripts/readme.md).

* `casmm-compile_queue-dev`

#### Running

`casmm-client-dev`

1. Follow the [client](/client#setup) setup
2. Run `yarn start` from `/client`

`casmm-server-dev`, `casmm-compile-dev`, `casmm-db-dev`, and `casmm-compile_queue-dev`

1. Install [docker](https://docs.docker.com/get-docker/)

2. Run `docker compose up` from `/`

   > Grant permission to the **scripts** and **server** directories if you are prompted
   

### Staging

#### Structure

The staging environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm-staging` - [casmm-staging.herokuapp.com](https://casmm-staging.herokuapp.com/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm-staging` is automatically built from the latest commits to branches matching `release/v[0-9].[0-9]`. Heroku runs the container orchestration from there.

### Production

#### Structure

The production environment is a Heroku app. It is composed of a web dyno, compile dyno, Heroku Postgres add-on, and Heroku Redis add-on.

* `casmm` - [www.casmm.org](https://www.casmm.org/)
  * The web dyno runs `server`
  * The compile dyno runs `compile`

#### Running

`casmm` is automatically built from the latest commits to `master`. Heroku runs the container orchestration from there.

<br/>

## Maintenance

All three components of the application have their own dependencies managed in their respective `package.json` files. Run `npm outdated` in each folder to see what packages have new releases. Before updating a package (especially new major versions), ensure that there are no breaking changes. Avoid updating all of the packages at once by running `npm update` because it could lead to breaking changes. 

### Strapi

This is by far the largest and most important dependency we have. Staying up to date with its [releases](https://github.com/strapi/strapi/releases) is important for bug/security fixes and new features. When it comes to actually upgrading Strapi make sure to follow the [migration guides](https://docs-v3.strapi.io/developer-docs/latest/update-migration-guides/migration-guides.html#v3-guides)!

<br/>

## CI/CD

All of the deployments and releases are handled automatically with [GitHub Actions](https://docs.github.com/en/actions). The workflows implement custom [Actions](https://github.com/STEM-C/CaSMM/actions) that live in the [auto](https://github.com/STEM-C/auto) repo.

<br/>

## Contributing

### Git Flow 

> We will follow this git flow for the most part — instead of individual release branches, we will have one to streamline staging deployment 

![Git Flow](https://nvie.com/img/git-model@2x.png)

### Branches

#### Protected

> Locked for direct commits — all commits must be made from a non-protected branch and submitted via a pull request with one approving review

- **master** - Production application

#### Non-protected

> Commits can be made directly to the branch

- **release** - Staging application
- **develop** - Working version of the application
- **feature/<`scaffold`>-<`feature-name`>** - Based off of develop
  - ex. **feature/cms-strapi**
- **hotfix/<`scaffold`>-<`fix-name`>** - Based off of master
  - ex. **hotfix/client-cors**

### Pull Requests

Before submitting a pull request, rebase the feature branch into the target branch to resolve any merge conflicts.

- PRs to **master** should squash and merge
- PRs to all other branches should create a merge commit
