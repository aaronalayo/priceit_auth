<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#About PriceIt | AUTH Service">About PriceIt | AUTH Service</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About PriceIt | AUTH Service
This Repo contains the AUTH Serivce of our BA project - PriceIt.

Please refer to [PriceIt Search API](https://github.com/aaronalayo/priceit-backend) for general information about the project.


### Built With

This project is built with the following tools

* [![NodeJs][NodeJs-logo]][NodeJs-url]
* [![Express][Express-logo]][Express-url]
* [![Typescript][Typescript-logo]][Typescript-url]
* [![MongoDB][MongoDB-logo]][MongoDB-url]
* [![RedisDB][Redis-logo]][Redis-url]

<p align="right">[<a href="#readme-top">back to top</a>]</p>

## Getting Started
Use the guide below to run the application locally. Remember to have the following projects configured as well:
* [![PriceIt-frontend][PriceIt-frontend-logo]][PriceIt-frontend-url]
* [![PriceIt-search][PriceIt-search-logo]][PriceIt-search-url]

### Prerequisites

Following criterias are needed:
- Docker installed
- [PriceIT | AUTH API](https://github.com/aaronalayo/priceit_frontend)
- [PriceIT | SEARCH API](https://github.com/aaronalayo/priceit-backend)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/aaronalayo/priceit_auth
   ``` 
2. Fill out the .env template
    ```variables
    NODE_ENV=

    PORT=
    DOCKER_SERVER_PORT=

    MONGO_HOST=
    MONGO_PORT=
    MONGO_USERNAME=
    MONGO_PASSWORD=

    REDIS_PASSWORD=
    REDIS_HOST=
    REDIS_PORT=
    REDIS_URL=

    ACCESS_TOKEN_PRIVATE_KEY=
    ACCESS_TOKEN_EXPIRE=15
    ORIGIN=
    ```
 
3. Spin up the container
   ```sh
   $ docker-compose up
   ```
4. Access the site
   ```
    http://localhost:<DOCKER_SERVER_PORT>
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage
<details><summary> Usage Examples</summary>
[Coming soon]
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Project Services / Repositories

Project Links:
- [![PriceIt-frontend][PriceIt-frontend-logo]][PriceIt-frontend-url]
- [![PriceIt-search][PriceIt-search-logo]][PriceIt-search-url]
- [![PriceIt-auth][PriceIt-auth-logo]][PriceIt-auth-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt

[NodeJS-logo]: https://img.shields.io/badge/NodeJS-Runtime%20Environment-brightgreen
[NodeJS-url]: https://nodejs.org/en/

[Express-logo]: https://img.shields.io/badge/JS%20FrameworkExpress-Web%20Framework-blue
[Express-url]: http://expressjs.com/

[Typescript-logo]: https://img.shields.io/badge/Typescript-JS%20with%20Types-blue
[Typescript-url]: https://www.typescriptlang.org/

[MongoDB-logo]: https://img.shields.io/badge/MongoDB-NoSQL%20DB-Green
[MongoDB-url]: https://www.mongodb.com/

[Redis-logo]: https://img.shields.io/badge/Redis-Database-orange
[Redis-url]: https://redis.io/

[PriceIt-auth-logo]: https://img.shields.io/badge/PriceIt-Auth%20API-green
[PriceIt-auth-url]: https://github.com/aaronalayo/priceit_auth

[PriceIt-search-logo]: https://img.shields.io/badge/PriceIt-Search%20API-orange
[PriceIt-search-url]: https://github.com/aaronalayo/priceit-backend

[PriceIt-frontend-logo]: https://img.shields.io/badge/PriceIt-Frontend-blue
[PriceIt-frontend-url]: https://github.com/aaronalayo/priceit_frontend