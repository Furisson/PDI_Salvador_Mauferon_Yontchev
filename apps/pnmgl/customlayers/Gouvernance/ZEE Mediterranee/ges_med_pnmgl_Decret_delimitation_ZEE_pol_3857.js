
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/ZEE Mediterranee/ges_med_pnmgl_Decret_delimitation_ZEE_pol_3857.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(149, 5, 5)",
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: "rgba(255, 255, 255, 0)",
        }),
    }),
});

new CustomLayer('ges_med_pnmgl_Decret_delimitation_ZEE_pol_3857', layer);
