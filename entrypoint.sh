#!/bin/bash

knex migrate:latest --env test --knexfile src/knexfile.js
knex seed:run --env test --knexfile src/knexfile.js