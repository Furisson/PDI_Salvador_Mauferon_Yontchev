
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Jetski/us_med_pnmgl_parcours_jetski_2023_ofb_ln_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(0, 47, 255)",
          width: 2,
        })

    }),

});

new CustomLayer('us_med_pnmgl_parcours_jetski_2023_ofb_ln_4326', layer);
