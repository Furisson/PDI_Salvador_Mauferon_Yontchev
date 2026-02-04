
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Ports et transport maritime/us_med_PNMGL_port_de_commerce_ofb_pt_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/3.svg", 
            scale: 1, 
        })
    }),
});

new CustomLayer('us_med_PNMGL_port_de_commerce_ofb_pt_4326', layer);
