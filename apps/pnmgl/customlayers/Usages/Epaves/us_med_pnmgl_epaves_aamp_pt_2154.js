
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Epaves/us_med_pnmgl_epaves_aamp_pt_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/epave2.png",
            scale: 0.8 
        })
    })
});

new CustomLayer('us_med_pnmgl_epaves_aamp_pt_2154', layer);
