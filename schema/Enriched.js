cube('Enriched', {
    sql: `SELECT REPLACE(a.apn, '-', '') as APN,
a.SitusZIP5 as ZIP_CODE,
b.city as CITY, 
b.state as STATE,
b.county_name as COUNTY, 
b.standardized_land_use_type BUILDING_TYPE, 
b.beds_count as NUMBER_OF_BEDROOMS,
b.baths as NUMBER_OF_BATHS,
b.total_area_sq_ft as TOTAL_SQ_FEET,
CONCAT(a.SitusHouseNbr, ' ', a.SitusStreet, ' ', a.SitusCity, ' ', a.SitusState, ' ', a.SitusZIP5) as FULL_ADDRESS,
a.HomeEquityIntelScore_LineofCredit as PROPENSITY_SCORE,
CASE WHEN a.HomeEquityIntelScore_LineofCredit is not null then 100 ELSE 0 END as propensity_score_populated_percentage
FROM raw_data.propensity_scores a LEFT JOIN raw_data.property_data b ON REPLACE(a.apn, '-', '') = CAST(b.apn_unformatted AS STRING) AND a.SitusZIP5=b.zip_code`,

    preAggregations: {
        // Pre-Aggregations definitions go here
        // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    },

    joins: {

    },

    measures: {
        PROPENSITY_SCORE: {
            sql: `PROPENSITY_SCORE`,
            type: `number`
        },

        propensity_score_populated_percentage: {
            sql: `propensity_score_populated_percentage`,
            type: `number`
        }
    },

    dimensions: {
        APN: {
            sql: `${CUBE}.\`APN\``,
            type: `string`
        },

        ZIP_CODE: {
            sql: `${CUBE}.\`ZIP_CODE\``,
            type: `string`
        },

        CITY: {
            sql: `${CUBE}.\`CITY\``,
            type: `string`
        },

        STATE: {
            sql: `${CUBE}.\`STATE\``,
            type: `string`
        },

        COUNTY: {
            sql: `${CUBE}.\`COUNTY\``,
            type: `string`
        }

    }
});