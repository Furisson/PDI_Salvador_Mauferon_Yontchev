
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Macrozone/us_med_macrozone_eof_pol_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgba(38, 0, 255, 0.6)",
          width: 1,
          lineDash: [5, 5] 
        }),
        fill: new ol.style.Fill({
          color: "rgba(216, 168, 255, 0.36)",
        }),
    }),
});

new CustomLayer('us_med_macrozone_eof_pol_4326', layer);
