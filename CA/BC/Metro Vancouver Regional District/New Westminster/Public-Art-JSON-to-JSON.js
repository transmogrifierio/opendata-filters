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
            const filteredFeature =
                {
                    type: "Feature",
                    geometry: feature.geometry,
                    properties: {}
                };
            filteredFeature.properties.name = feature.properties.Name;

            const description = feature.properties.Descriptn.trim();

            if(description.length > 0)
            {
                const paragraphs = description.split(/\r\n|\n\r|\n|\r/g);

                filteredFeature.properties.description = [];

                paragraphs.forEach((paragraph) =>
                {
                    const trimmed = paragraph.trim();

                    if(trimmed.length > 0)
                    {
                        filteredFeature.properties.description.push(trimmed);
                    }
                });
            }

            filtered.features.push(filteredFeature);
        });

        return filtered;
    }
}