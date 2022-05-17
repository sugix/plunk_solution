# plunk_solution

> My philopsophy is to make the take home exercise a win-win situation and make it a value for my time spent. 

## Approach

- Data modeling which is in between 100% flat(denormalized) structure and full fledged history tracking using traditional SCD methods described in Kimball. 
- Data modeling as code. I wanted to give a try on Cube.dev Javascript based modeling language. 
- I have other code examples part of my Github repository where I showcase the way to build a pipeline to pull data from the web (via API), use DuckDB to query and use FastApi to expose URLs on final tables. For this exercise, I wanted to leverage the CUBE.dev as a platform to expose APIs based on the models which I have defined. Morevoer, cube.dev allows the above said flexibility to model data based on entitity classifications. For example, individual cubes represent logical segregation and each model contains both dimensions and facts co-located. 

## Things Completed

- Loaded data to Bigquery as a Data warehouse. 
- Answered the questions asked in the exercise document in the form of SQL which I am sharing below for reference. 

```sql
{
    WITH result_set AS (
  SELECT 
    sub.ZIP_CODE, 
    sub.FULL_ADDRESS, 
    sub.PROPENSITY_SCORE, 
    ROW_NUMBER() OVER (
      PARTITION BY sub.ZIP_CODE 
      ORDER BY 
        sub.PROPENSITY_SCORE DESC
    ) AS PROPENSITY_SCORE_RANK 
  FROM 
    (
      SELECT 
        REPLACE(a.apn, '-', '') as APN, 
        a.SitusZIP5 as ZIP_CODE, 
        b.city as CITY, 
        b.state as STATE, 
        b.county_name as COUNTY, 
        b.standardized_land_use_type BUILDING_TYPE, 
        b.beds_count as NUMBER_OF_BEDROOMS, 
        b.baths as NUMBER_OF_BATHS, 
        b.total_area_sq_ft as TOTAL_SQ_FEET, 
        CONCAT(
          a.SitusHouseNbr, ' ', a.SitusStreet, 
          ' ', a.SitusCity, ' ', a.SitusState, 
          ' ', a.SitusZIP5
        ) as FULL_ADDRESS, 
        a.HomeEquityIntelScore_LineofCredit as PROPENSITY_SCORE, 
        CASE WHEN a.HomeEquityIntelScore_LineofCredit is not null then 100 ELSE 0 END as propensity_score_populated_percentage 
      FROM 
        `plunk-exercise.raw_data.propensity_scores` a 
        LEFT JOIN `plunk-exercise.raw_data.property_data` b ON REPLACE(a.apn, '-', '') = CAST(b.apn_unformatted AS STRING) 
        AND a.SitusZIP5 = b.zip_code 
      WHERE 
        b.zip_code is not null
    ) sub
) 
SELECT 
  result_set.ZIP_CODE, 
  result_set.FULL_ADDRESS, 
  result_set.PROPENSITY_SCORE 
FROM 
  result_set 
WHERE 
  result_set.PROPENSITY_SCORE_RANK < 3;

}
```

- Screenshots and results (as csv) are part of this repository. 
- My philosophy for Data engineering. Data infrastructure/platform and understanding the internals are important for efficient Data engineering. I can containize and deploy Cube.dev locally along with other necessary connections to other data stores (warehouse, operational stores) but I have chosen to connect the above said Google BigQuery and Cube.dev cloud with dedicated IAM, service account. 

- Please also check out the results.csv file which is the answer and possibly the dataset has to be exposed via API. The Resultset.js is the corresponding cube. 


## Yet to do

> https://github.com/cube-js/cube.js/issues/538 or some known unknown is causing an error to expose an API via cube.dev directly on top of the data model 

- Fix the following error which is related to Cube.dev and BigqQuery and above is a reference. 

```
{
    ERROR:  Internal: Execution("Internal: Error: SELECT list expression references enriched.PROPENSITY_SCORE which is neither grouped nor aggregated at [2:224]")
}
```

- Expose the results via API as per the requirement. 