<?xml version="1.0" encoding="UTF-8"?>
<sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld"
                             version="1.0.0"
                             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                             xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
                             xmlns:ogc="http://www.opengis.net/ogc"
                             xmlns:gml="http://www.opengis.net/gml">
    <sld:NamedLayer>
        <sld:Name>Embarcations</sld:Name>
        <sld:UserStyle>
            <sld:Name>survol</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Rule>
                    <Title>Bateaux-Bus</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Bateaux-Bus</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#98c9e0</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Bateaux de plongee</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Bateaux de plongee</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#8c564b</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Bouee tractee</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Bouee tractee</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#9467bd</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Bouee tractee par un bateau</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Bouee tractee par un bateau</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#e377c2</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Canoe-kayak</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Canoe-kayak</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ffbb78</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Embarcation a moteur avec cabine</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Embarcation a moteur avec cabine</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#bcbd22</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Embarcation a moteur sans cabine</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Embarcation a moteur sans cabine</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#2ca02c</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Embarcation a voile avec cabine</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Embarcation a voile avec cabine</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#d62728</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Embarcation a voile sans cabine</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Embarcation a voile sans cabine</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ff7f0e</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Embarcation de peche professionnel</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Embarcation de peche professionnel</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#17becf</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>
                   <sld:Rule>
                    <Title>Embarcation de voile legere multicoque</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Embarcation de voile legere multicoque</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#e377c2</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Kayak</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Kayak</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#FF0000</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#FF0000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Kite surf (ou planche aerotractee)</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Kite surf (ou planche aerotractee)</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#17becf</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Monocoque (optimist, deriveur)</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Monocoque (optimist, deriveur)</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#bcbd22</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Multicoque (catamaran, trimaran)</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Multicoque (catamaran, trimaran)</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#8c564b</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Parasailing ou parachute ascensionnel tracte</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Parasailing ou parachute ascensionnel tractee</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#9467bd</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Parachute ascensionnel</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Parachute ascensionnel</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#8c564b</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Pedalo</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Pedalo</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#e377c2</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Personne en activite de ski nautique</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Personne en activite de ski nautique</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ff7f0e</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Plaisance a moteur habitable</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Plaisance a moteur habitable</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#1f77b4</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Plaisance a moteur non habitable</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Plaisance a moteur non habitable</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ff5733</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Plaisance a voile habitable</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Plaisance a voile habitable</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#32a852</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Planche a voile</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Planche a voile</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#bcbd22</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Plongee scaphandre</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Plongee scaphandre</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#f08080</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Promenade en mer sur bateau moteur</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Promenade en mer sur bateau moteur</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#9467bd</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule> 

                <sld:Rule>
                    <Title>Scooter des mers / jetski</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Scooter des mers / jetski</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ff7f0e</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>             

                <sld:Rule>
                    <Title>Sports motonautiques sur VNM</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Sports motonautiques sur VNM</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#d62728</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Stand-up paddle</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Stand-up paddle</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#7f7f7f</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Stand-Up Paddle</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Stand-Up Paddle</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ffbb78</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Transport de passagers - bateau-bus ou bacs</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Transport de passagers - bateau-bus ou bacs</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#98c9e0</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>

                <sld:Rule>
                    <Title>Unknown Point Feature</Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>code_id</ogc:PropertyName>
                            <ogc:Literal>Unknown Point Feature</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <PointSymbolizer>
                        <Graphic>
                            <Mark>
                                <WellKnownName>circle</WellKnownName>
                                <Fill>
                                    <CssParameter name="fill"><ogc:Literal>#ff0000</ogc:Literal></CssParameter>
                                </Fill>
                                <Stroke>
                                    <CssParameter name="stroke"><ogc:Literal>#000000</ogc:Literal></CssParameter>
                                    <CssParameter name="stroke-width"><ogc:Literal>1</ogc:Literal></CssParameter>
                                </Stroke>
                            </Mark>
                            <Opacity>
                                <ogc:Literal>1.0</ogc:Literal>
                            </Opacity>
                            <Size>
                                <ogc:Literal>6</ogc:Literal>
                            </Size>
                        </Graphic>
                    </PointSymbolizer>
                </sld:Rule>               

            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>