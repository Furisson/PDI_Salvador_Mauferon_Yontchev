
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Etude prospective tdc 2050/us_med_pnmgl_DSAS_pt_2154.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/13.svg", 
            scale: 1, 
        })
    }),
});

new CustomLayer('us_med_pnmgl_DSAS_pt_2154', layer);
