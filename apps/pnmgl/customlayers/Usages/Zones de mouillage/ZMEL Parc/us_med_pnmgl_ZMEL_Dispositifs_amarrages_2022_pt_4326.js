
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Zones de mouillage/ZMEL Parc/us_med_pnmgl_ZMEL_Dispositifs_amarrages_2022_pt_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: "apps/pnmgl/img/defaut.svg", 
            scale: 1, 
        })
    }),
});

new CustomLayer('us_med_pnmgl_ZMEL_Dispositifs_amarrages_2022_pt_4326', layer);
