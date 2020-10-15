import {JSONFilter} from "../../../../JSONFilter.js";

export default class PublicArtJSON_JSON
    extends JSONFilter
{
    simplifyString(str)
    {
        let simplifiedStr = str.trim();

        if(simplifiedStr.startsWith("'"))
        {
            simplifiedStr = simplifiedStr.substring(1);
        }

        if(simplifiedStr.endsWith("'"))
        {
            simplifiedStr = simplifiedStr.substring(0, simplifiedStr.length - 1);
        }

        simplifiedStr = simplifiedStr.trim();

        return simplifiedStr;
    }

    doFilter(data)
    {
        const filtered = {};

        filtered.type = "FeatureCollection";
        filtered.features = [];

        data.forEach((item) =>
        {
            const feature =
                {
                    type: "Feature",
                    geometry: {},
                    properties: {}
                };
            feature.geometry.type = "Point";
            feature.geometry.coordinates = [item.longitude, item.latitude];
            feature.properties.name = this.simplifyString(item.title);

            if(item.hasOwnProperty("description"))
            {
                let description = this.simplifyString(item.description);

                if(description.length > 0)
                {
                    feature.properties.description = [description];
                }
            }

            if(item.hasOwnProperty("classification"))
            {
                feature.properties.type = this.simplifyString(item.classification);
            }

            if(item.hasOwnProperty("media"))
            {
                let media = this.simplifyString(item.media);

                if(media.length > 0)
                {
                    const mediaItems = media.split(',');
                    const mediaArray = [];

                    mediaItems.forEach((mediaItem) =>
                    {
                        const trimmedItem = mediaItem.trim();

                        if(trimmedItem.length > 0)
                        {
                            mediaArray.push(trimmedItem);
                        }
                    });

                    if(media.length > 0)
                    {
                        feature.properties.media = mediaArray;
                    }
                }
            }

            if(item.hasOwnProperty("location"))
            {
                feature.properties.location = this.simplifyString(item.location);
            }

            if(item.hasOwnProperty("date"))
            {
                feature.properties.date = this.simplifyString(item.date);
            }

            if(item.hasOwnProperty("artist"))
            {
                const artist = {};

                if(item.hasOwnProperty("artist_first_name"))
                {
                    const firstName = this.simplifyString(item.artist_first_name);

                    artist.firstName = firstName;
                }

                if(item.hasOwnProperty("artist_last_name"))
                {
                    const lastName = this.simplifyString(item.artist_last_name);

                    artist.lastName = lastName;
                }

                if(Object.getOwnPropertyNames().length > 0)
                {
                    feature.properties.artist = artist;
                }
            }

            filtered.features.push(feature);
        });

        return filtered;
    }
}
