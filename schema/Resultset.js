cube('Resultset', {
    sql: `WITH result_set AS (

SELECT 
ZIP_CODE,
FULL_ADDRESS,
PROPENSITY_SCORE,
ROW_NUMBER() OVER (PARTITION BY ZIP_CODE ORDER BY PROPENSITY_SCORE DESC) AS PROPENSITY_SCORE_RANK

FROM ${Enriched.sql()} ) SELECT * FROM result_set`

    ,

    preAggregations: {
        // Pre-Aggregations definitions go here
        // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    },

    joins: {

    },

    measures: {
        PROPENSITY_SCORE: {
            sql: `PROPENSITY_SCORE`,
            type: `number`,
            drillMembers: [ZIP_CODE, FULL_ADDRESS]
        }
    },

    dimensions: {
        ZIP_CODE: {
            sql: `${CUBE}.\`ZIP_CODE\``,
            type: `string`
        },

        FULL_ADDRESS: {
            sql: `${CUBE}.\`FULL_ADDRESS\``,
            type: `string`
        },

        PROPENSITY_SCORE_RANK: {
            sql: `${CUBE}.\`PROPENSITY_SCORE_RANK\``,
            type: `number`,
        }
    }
});