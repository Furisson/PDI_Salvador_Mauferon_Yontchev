
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/Delimitation communes/ges_med_pnmgl_REF_MET_Communes_littorales_pol_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(0, 0, 0)",
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: "rgba(0, 0, 0, 0.07)",
        }),
    }),
});

new CustomLayer('ges_med_pnmgl_REF_MET_Communes_littorales_pol_2154', layer);
