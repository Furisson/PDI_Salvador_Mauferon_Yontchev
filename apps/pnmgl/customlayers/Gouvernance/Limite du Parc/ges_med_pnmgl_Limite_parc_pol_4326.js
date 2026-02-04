
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/Limite du Parc/ges_med_pnmgl_Limite_parc_pol_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(1, 2, 90)",
          width: 3,
        }),
        fill: new ol.style.Fill({
          color: "rgba(19, 67, 134, 0.12)",
        }),
    }),
});

new CustomLayer('ges_med_pnmgl_Limite_parc_pol_4326', layer);
