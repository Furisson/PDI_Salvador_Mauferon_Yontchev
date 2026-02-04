
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/Carte des vocations du Parc/ges_med_pnmgl_vocation_aamp_pol_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(0, 0, 0)",
          width: 2,
        }),
        fill: new ol.style.Fill({
          color: "rgba(73, 137, 255, 0.61)",
        }),
    }),
});

new CustomLayer('ges_med_pnmgl_vocation_aamp_pol_4326', layer);
