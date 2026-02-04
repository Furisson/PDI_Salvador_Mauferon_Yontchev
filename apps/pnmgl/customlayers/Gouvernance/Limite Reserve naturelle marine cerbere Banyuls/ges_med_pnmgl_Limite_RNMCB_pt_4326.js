
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/Limite Reserve naturelle marine cerbere Banyuls/ges_med_pnmgl_Limite_RNMCB_pt_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/7.svg", 
            scale: 0.7, 
        })
    }),
});

new CustomLayer('ges_med_pnmgl_Limite_RNMCB_pt_4326', layer);
