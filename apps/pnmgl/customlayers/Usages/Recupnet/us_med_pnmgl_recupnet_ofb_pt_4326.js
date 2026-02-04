
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Recupnet/us_med_pnmgl_recupnet_ofb_pt_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/14.svg", 
            scale: 1, 
        })
    }),
});

new CustomLayer('us_med_pnmgl_recupnet_ofb_pt_4326', layer);
