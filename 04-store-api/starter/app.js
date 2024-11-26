const express = require('express');
const app = express();

const requireAll = require('./utils/requireAll');
const { errorHandler, notFound } = requireAll('./middleware');

process.loadEnvFile('./.env');
