import {JSONFilter} from "../../../../JSONFilter.js";

export default class PublicArtJSONToJSON
    extends JSONFilter
{
    doFilter(data)
    {
        const filtered = {};
        const features = data.features;

        filtered.type = "FeatureCollection";
        filtered.features = [];

        features.forEach((feature) =>
        {
            if(feature.properties.Title)
            {
                const filteredFeature =
                    {
                        type: "Feature",
                        geometry: feature.geometry,
                        properties: {}
                    };

                filteredFeature.properties.name = feature.properties.Title;
                filtered.features.push(filteredFeature);
            }
        });

        return filtered;
    }
}
