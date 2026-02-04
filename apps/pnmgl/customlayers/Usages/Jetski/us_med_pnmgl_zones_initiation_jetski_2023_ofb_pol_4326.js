
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Jetski/us_med_pnmgl_zones_initiation_jetski_2023_ofb_pol_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(0, 0, 0, 0.6)",
          width: 2,
        }),
        fill: new ol.style.Fill({
          color: "rgba(131, 131, 131, 0.38)",
        }),
    }),
});

new CustomLayer('us_med_pnmgl_zones_initiation_jetski_2023_ofb_pol_4326', layer);
