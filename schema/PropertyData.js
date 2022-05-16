cube(`PropertyData`, {
  sql: `SELECT * FROM raw_data.property_data`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [streetName, city, countyName]
    },
    
    bedsCount: {
      sql: `beds_count`,
      type: `sum`
    }
  },
  
  dimensions: {
    primaryNumber: {
      sql: `primary_number`,
      type: `string`
    },
    
    streetPreDirection: {
      sql: `street_pre_direction`,
      type: `string`
    },
    
    streetName: {
      sql: `street_name`,
      type: `string`
    },
    
    streetSuffix: {
      sql: `street_suffix`,
      type: `string`
    },
    
    streetPostDirection: {
      sql: `street_post_direction`,
      type: `string`
    },
    
    secondaryDesignator: {
      sql: `secondary_designator`,
      type: `string`
    },
    
    secondaryNumber: {
      sql: `secondary_number`,
      type: `string`
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    state: {
      sql: `state`,
      type: `string`
    },
    
    latitude: {
      sql: `latitude`,
      type: `string`
    },
    
    longitude: {
      sql: `longitude`,
      type: `string`
    },
    
    countyName: {
      sql: `county_name`,
      type: `string`
    },
    
    standardizedLandUseType: {
      sql: `standardized_land_use_type`,
      type: `string`
    },
    
    baths: {
      sql: `baths`,
      type: `string`
    }
  }
});
