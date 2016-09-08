'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');
const Job = require('../config/job');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this secret')
        .example('7babc233de26ab19ead1b9c278128d5c434910ee'),

    pipelineId: Joi
        .string().hex().length(40)
        .description('pipeline associated with the secret')
        .example('2d991790bab1ac8576097ca87f170df73410b55c'),

    name: Job.secret
        .description('Name of the secret')
        .example('NPM_TOKEN'),

    value: Joi
        .string()
        .description('value of the secret')
        .example('2d991790bab1ac8576097ca87f170df73410b55c'),

    allowInPR: Joi
        .boolean()
        .description('flag to denote if the secret can be shown in PR builds')
};

module.exports = {
    /**
     * All the available properties of Pipeline
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Secret'),

    /**
     * Properties for secret that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'pipelineId', 'name', 'allowInPR'
    ], ['value'])).label('Get Secret'),

    /**
     * Properties for secret that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'pipelineId', 'name', 'value', 'allowInPR'
    ], [])).label('Create Secret'),

    /**
     * Properties for secret that will be passed during a DELETE request
     *
     * @property remove
     * @type {Joi}
     */
    remove: Joi.object(mutate(MODEL, ['id'], [])).label('Remove Secret'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['pipelineId', 'name'],

    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(MODEL),

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'secrets',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['pipelineId']
};
