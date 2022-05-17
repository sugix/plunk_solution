cube('Resultset', {
    sql: `WITH result_set AS (

SELECT 
sub.ZIP_CODE,
sub.FULL_ADDRESS,
sub.PROPENSITY_SCORE,
ROW_NUMBER() OVER (PARTITION BY sub.ZIP_CODE ORDER BY sub.PROPENSITY_SCORE DESC) AS PROPENSITY_SCORE_RANK

FROM ${Enriched.sql()} ) SELECT * FROM result_set`

    ,

    preAggregations: {
        // Pre-Aggregations definitions go here
        // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    },

    joins: {

    },

    measures: {

    },

    dimensions: {
        ZIP_CODE: {
            sql: `${CUBE}.\`ZIP_CODE\``,
            type: `string`
        }
    }
});