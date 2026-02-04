
const layer = new ol.layer.Vector({
    source: new ol.source.Vector({

        url: 'apps/pnmgl/data/geojson/Gouvernance/Limite Reserve naturelle du Mas Larrieu et PNR/ges_med_pnmgl_Delimitation_Mas_Larrieu_et_PNR_2022_pol_4326.geojson',
        format: new ol.format.GeoJSON()

    }),

    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: "rgb(104, 42, 166)",
          width: 1,
        }),
        fill: new ol.style.Fill({
          color: "rgba(218, 145, 255, 0.19)",
        }),
    }),
});

new CustomLayer('ges_med_pnmgl_Delimitation_Mas_Larrieu_et_PNR_2022_pol_4326', layer);
