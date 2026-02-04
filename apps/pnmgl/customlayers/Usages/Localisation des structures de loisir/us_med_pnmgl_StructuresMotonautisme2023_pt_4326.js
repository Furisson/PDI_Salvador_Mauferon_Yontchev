
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Localisation des structures de loisir/us_med_pnmgl_StructuresMotonautisme2023_pt_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/7.svg", 
            scale: 1, 
        })
    }),
});

new CustomLayer('us_med_pnmgl_StructuresMotonautisme2023_pt_4326', layer);
