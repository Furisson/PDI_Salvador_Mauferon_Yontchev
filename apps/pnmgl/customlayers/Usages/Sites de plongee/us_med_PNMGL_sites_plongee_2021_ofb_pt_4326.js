
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Sites de plongee/us_med_PNMGL_sites_plongee_2021_ofb_pt_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/15.svg", 
            scale: 1, 
        })
    }),
});
new CustomLayer('us_med_PNMGL_sites_plongee_2021_ofb_pt_4326', layer);
