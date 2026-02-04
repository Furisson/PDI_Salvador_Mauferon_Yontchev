
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Zones de mouillage/ZMO Collioure et Banyuls/us_med_pnmgl_ZMO_Collioure_Banyuls_pol_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(18, 19, 19, 0.72)",
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: "rgba(0, 217, 255, 0.2)",
        }),
    }),
});

new CustomLayer('us_med_pnmgl_ZMO_Collioure_Banyuls_pol_4326', layer);
