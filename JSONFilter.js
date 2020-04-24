import {Filter} from "./Filter.js";

export class JSONFilter
    extends Filter
{
    filter(data)
    {
        let jsonData = data;

        if(typeof jsonData === 'string' || typeof jsonData instanceof String)
        {
            jsonData = JSON.parse(jsonData);
        }

        if((typeof jsonData !== 'object' && !(typeof Array.isArray(jsonData))) || jsonData === null)
        {
            throw "data must be an object";
        }

        const filteredData = this.doFilter(jsonData);

        return filteredData;
    }

    doFilter(data)
    {
        throw "Must override doFilter(data)";
    }
}