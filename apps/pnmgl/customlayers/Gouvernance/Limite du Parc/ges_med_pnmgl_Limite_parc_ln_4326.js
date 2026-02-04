
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/Limite du Parc/ges_med_pnmgl_Limite_parc_ln_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgb(1, 2, 90)", 
            width: 3, 
        })
    })
});

new CustomLayer('ges_med_pnmgl_Limite_parc_ln_4326', layer);
