cube(`PropensityScores`, {
  sql: `SELECT * FROM raw_data.propensity_scores`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [situscity]
    }
  },
  
  dimensions: {
    apn: {
      sql: `apn`,
      type: `string`
    },
    
    situshousenbr: {
      sql: `${CUBE}.\`SitusHouseNbr\``,
      type: `string`
    },
    
    situshousenbrsuffix: {
      sql: `${CUBE}.\`SitusHouseNbrSuffix\``,
      type: `string`
    },
    
    situsdirectionleft: {
      sql: `${CUBE}.\`SitusDirectionLeft\``,
      type: `string`
    },
    
    situsstreet: {
      sql: `${CUBE}.\`SitusStreet\``,
      type: `string`
    },
    
    situsmode: {
      sql: `${CUBE}.\`SitusMode\``,
      type: `string`
    },
    
    situsdirectionright: {
      sql: `${CUBE}.\`SitusDirectionRight\``,
      type: `string`
    },
    
    situsunittype: {
      sql: `${CUBE}.\`SitusUnitType\``,
      type: `string`
    },
    
    situsunitnbr: {
      sql: `${CUBE}.\`SitusUnitNbr\``,
      type: `string`
    },
    
    situscity: {
      sql: `${CUBE}.\`SitusCity\``,
      type: `string`
    },
    
    situsstate: {
      sql: `${CUBE}.\`SitusState\``,
      type: `string`
    }
  }
});
