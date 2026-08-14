const sharedBrTable = `
  <table class="data-table">
    <thead><tr><th>Conical flask</th><th>Volume of 0.05 M Br<sub>2</sub>(aq) / cm<sup>3</sup></th><th>Volume of water / cm<sup>3</sup></th></tr></thead>
    <tbody><tr><th>A</th><td>1.0</td><td>4.0</td></tr><tr><th>B</th><td>2.0</td><td>3.0</td></tr><tr><th>C</th><td>3.0</td><td>2.0</td></tr><tr><th>D</th><td>4.0</td><td>1.0</td></tr></tbody>
  </table>`;

const assertionOptions = [
  "Both statements are true and the 2nd statement is a correct explanation of the 1st statement.",
  "Both statements are true and the 2nd statement is NOT a correct explanation of the 1st statement.",
  "The 1st statement is false but the 2nd statement is true.",
  "Both statements are false."
];

window.TOPIC9_QUESTIONS = [
  {
    r:"DSE/21/1A/26", p:62, a:1, strand:"Rate curves & calculations",
    stem:`<p>Refer to the following experiment on the study of the rate of reaction between HCO<sub>2</sub>H(aq) and Br<sub>2</sub>(aq) at a certain temperature. It is given that the rate depends on both the concentrations of HCO<sub>2</sub>H(aq) and Br<sub>2</sub>(aq):</p>
      <p class="equation">HCO<sub>2</sub>H(aq) + Br<sub>2</sub>(aq) → 2HBr(aq) + CO<sub>2</sub>(g)</p>
      <p>5.0 cm<sup>3</sup> of 0.05 M HCO<sub>2</sub>H(aq) are separately added to four conical flasks, each containing Br<sub>2</sub>(aq) prepared by mixing different volumes of 0.05 M Br<sub>2</sub>(aq) and water as shown below.</p>${sharedBrTable}
      <p>Which graph best represents the variation of [Br<sub>2</sub>(aq)] in the reaction mixture of conical flask <strong>B</strong> with time?</p>`,
    options:["Graph A","Graph B","Graph C","Graph D"],
    diagrams:[{src:"topic9-assets/q01.jpg",crop:[1458,1129,170,475,1180,645],label:"Graph choices A-D for bromine concentration against time"}]
  },
  {
    r:"DSE/16/1A/25", p:77, a:2, strand:"Rate curves & calculations",
    stem:`<p>In an experiment, 0.03 mol of Mg(s) is allowed to react with 20.0 cm<sup>3</sup> of 1.0 M HCl(aq). Which graph best represents the results of the experiment?</p>`,
    options:["Graph A","Graph B","Graph C","Graph D"],
    diagrams:[{src:"topic9-assets/q02.jpg",crop:[1458,746,175,145,1185,585],label:"Graph choices A-D for the amount of hydrogen formed against time"}]
  },
  {
    r:"DSE/12/1A/26", p:88, a:3, strand:"Rate curves & calculations",
    stem:`<p>The concentration-time graph for a certain chemical reaction in a closed vessel of fixed volume is shown below.</p>`,
    options:["P(g) → Q(g)","Q(g) → P(g)","P(g) → 2Q(g)","Q(g) → 2P(g)"],
    afterDiagram:`<p>Which chemical equation correctly represents the reaction?</p>`,
    diagrams:[{src:"topic9-assets/q03.jpg",crop:[1458,864,360,125,760,535],label:"Concentration-time graph for gases P and Q"}]
  },
  {
    r:"DSE/24/1A/25", p:57, a:3, strand:"Rate curves & calculations",
    stem:`<p>An experiment was performed to study the rate of the following reaction:</p><p class="equation">X<sub>2</sub>(g) → 2X(g)</p><p>In a closed container of fixed volume at a certain temperature, the concentration of X<sub>2</sub>(g) decreased from 0.10 mol dm<sup>-3</sup> to 0.04 mol dm<sup>-3</sup> in the first 4 minutes.</p><p>What is the average rate of formation of X(g) in the first 4 minutes?</p>`,
    options:["0.010 mol dm⁻³ min⁻¹","0.015 mol dm⁻³ min⁻¹","0.020 mol dm⁻³ min⁻¹","0.030 mol dm⁻³ min⁻¹"]
  },
  {
    r:"DSE/22/1A/31", p:60, a:1, strand:"Monitoring reaction progress",
    stem:`<p>Consider the experimental set-up shown below.</p>`,
    afterDiagram:`<p>Under room conditions, which pairs of reactants can have the progress of their reaction followed by the set-up?</p><ol class="statements"><li>Zn(OH)<sub>2</sub>(s) and HNO<sub>3</sub>(aq)</li><li>Mg(s) and HCl(aq)</li><li>KBr(s) and Cl<sub>2</sub>(aq)</li></ol>`,
    options:["(1) only","(2) only","(1) and (3) only","(2) and (3) only"],
    diagrams:[{src:"topic9-assets/q05.jpg",crop:[1458,672,470,95,540,235],label:"Conical flask connected to a gas syringe"}]
  },
  {
    r:"DSE/17/1A/28", p:57, a:3, strand:"Monitoring reaction progress",
    stem:`<p>Refer to the following set-up.</p>`,
    afterDiagram:`<p>Of which reaction can the rate be studied by the set-up?</p>`,
    options:[
      "CaCl₂(aq) + H₂SO₄(aq) → CaSO₄(s) + 2HCl(aq)",
      "Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)",
      "2FeSO₄(aq) + 2H₂SO₄(l) → Fe₂(SO₄)₃(aq) + 2H₂O(l) + SO₂(g)",
      "Na₂S₂O₃(aq) + 2HCl(aq) → S(s) + SO₂(aq) + H₂O(l) + 2NaCl(aq)"
    ],
    diagrams:[{src:"topic9-assets/q06.jpg",crop:[1458,642,360,110,790,325],label:"Disappearing-cross experiment using a beaker"}]
  },
  {
    r:"DSE/13/1A/33", p:81, a:1, strand:"Monitoring reaction progress",
    stem:`<p>For which reactions can their progress be followed by colorimetry?</p><ol class="statements equations"><li>2MnO<sub>4</sub><sup>-</sup>(aq) + 5C<sub>2</sub>O<sub>4</sub><sup>2-</sup>(aq) + 16H<sup>+</sup>(aq) → 2Mn<sup>2+</sup>(aq) + 10CO<sub>2</sub>(g) + 8H<sub>2</sub>O(l)</li><li>SO<sub>3</sub><sup>2-</sup>(aq) + 2H<sup>+</sup>(aq) → SO<sub>2</sub>(aq) + H<sub>2</sub>O(l)</li><li>Br<sub>2</sub>(aq) + HCO<sub>2</sub>H(aq) → 2Br<sup>-</sup>(aq) + CO<sub>2</sub>(g) + 2H<sup>+</sup>(aq)</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  },
  {
    r:"DSE/16/1A/34", p:77, a:1, strand:"Monitoring reaction progress",
    stem:`<p>Consider the following reaction:</p><p class="equation">Br<sub>2</sub>(aq) + HCOOH(aq) → CO<sub>2</sub>(g) + 2HBr(aq)</p><p>Which quantities can be measured in order to follow the progress of the reaction?</p><ol class="statements"><li>the volume of gas formed</li><li>the turbidity of the reaction mixture</li><li>the colour intensity of the reaction mixture</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  },
  {
    r:"DSE/19/1A/35", p:86, a:1, strand:"Monitoring reaction progress",
    stem:`<p>Consider the following reaction:</p><p class="equation">5NaBr(aq) + NaBrO<sub>3</sub>(aq) + 6HCl(aq) → 3Br<sub>2</sub>(aq) + 6NaCl(aq) + 3H<sub>2</sub>O(l)</p><p class="note">The reactant solutions are colourless.</p><p>Which quantities can be measured in order to follow the progress of the reaction?</p><ol class="statements"><li>pH of the reaction mixture</li><li>pressure of the reaction system</li><li>colour intensity of the reaction mixture</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  },
  {
    r:"DSE/25/1A/34", p:69, a:2, strand:"Monitoring reaction progress",
    stem:`<p>Refer to the following reaction:</p><p class="equation">2MnO<sub>4</sub><sup>-</sup>(aq) + 5C<sub>2</sub>O<sub>4</sub><sup>2-</sup>(aq) + 16H<sup>+</sup>(aq) → 2Mn<sup>2+</sup>(aq) + 10CO<sub>2</sub>(g) + 8H<sub>2</sub>O(l)</p><p>Which quantities can be measured in order to follow the progress of the reaction?</p><ol class="statements"><li>mass of H<sub>2</sub>O(l) formed</li><li>pressure of the reaction system</li><li>colour intensity of the reaction system</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  },
  {
    r:"DSE/20/1A/35", p:39, a:0, strand:"Monitoring reaction progress",
    stem:`<p>Refer to the following set-up.</p>`,
    afterDiagram:`<p>For which reactions can the effect of concentration on rate be studied by the set-up?</p><ol class="statements equations"><li>MgO(s) + 2HCl(aq) → MgCl<sub>2</sub>(aq) + H<sub>2</sub>O(l)</li><li>Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub>(aq) + 2HCl(aq) → S(s) + SO<sub>2</sub>(g) + H<sub>2</sub>O(l) + 2NaCl(aq)</li><li>Mg(s) + ZnSO<sub>4</sub>(aq) → MgSO<sub>4</sub>(aq) + Zn(s)</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"],
    diagrams:[{src:"topic9-assets/q11.jpg",crop:[1458,720,410,90,660,320],label:"Disappearing-cross experiment using a beaker"}]
  },
  {
    r:"DSE/17/1A/27", p:73, a:2, strand:"Monitoring reaction progress",
    stem:`<p>Refer to the following set-up.</p>`,
    afterDiagram:`<p><strong>A</strong>(aq) and <strong>B</strong>(aq) react to form a turbid mixture. Three trials were performed. In each trial, A(aq) was mixed with H<sub>2</sub>O(l), then B(aq) was added. The time for the cross to become invisible when viewed from above was measured.</p><table class="data-table"><thead><tr><th rowspan="2">Trial</th><th colspan="3">Volume used / cm<sup>3</sup></th><th rowspan="2">Time / s</th></tr><tr><th>A(aq)</th><th>H<sub>2</sub>O(l)</th><th>B(aq)</th></tr></thead><tbody><tr><th>1</th><td>10.0</td><td>20.0</td><td>10.0</td><td>82</td></tr><tr><th>2</th><td>10.0</td><td>10.0</td><td>20.0</td><td>41</td></tr><tr><th>3</th><td>20.0</td><td>10.0</td><td>10.0</td><td>82</td></tr></tbody></table><p>Which statement concerning the rate of reaction is correct?</p>`,
    options:["It depends on [A(aq)] and also depends on [B(aq)].","It increases with [A(aq)] but does not increase with [B(aq)].","It increases with [B(aq)] but does not increase with [A(aq)].","It does not depend on [A(aq)] and also does not depend on [B(aq)]."],
    diagrams:[{src:"topic9-assets/q12.jpg",crop:[1458,959,350,115,800,325],label:"Disappearing-cross experimental set-up"}]
  },
  {
    r:"DSE/25/1A/25", p:52, a:1, strand:"Factors affecting reaction rate",
    stem:`<p>Under room conditions, the initial rate of the reaction between excess zinc granules and 100 cm<sup>3</sup> of 1.0 M HCl(aq) is measured as <em>r</em>. Using the same amount of zinc granules under room conditions, with which solution would the zinc granules react to give the same initial rate <em>r</em>?</p>`,
    options:["50 cm³ of 2.0 M HCl(aq)","200 cm³ of 1.0 M HCl(aq)","100 cm³ of 1.0 M H₂SO₄(aq)","100 cm³ of 1.0 M CH₃COOH(aq)"]
  },
  {
    r:"DSE/21/1A/25", p:86, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>Refer to the reaction between HCO<sub>2</sub>H(aq) and Br<sub>2</sub>(aq) described below. The rate depends on both reactant concentrations.</p><p class="equation">HCO<sub>2</sub>H(aq) + Br<sub>2</sub>(aq) → 2HBr(aq) + CO<sub>2</sub>(g)</p><p>5.0 cm<sup>3</sup> of 0.05 M HCO<sub>2</sub>H(aq) are separately added to four flasks containing the mixtures shown.</p>${sharedBrTable}<p>In which flask does the reaction have the fastest initial rate?</p>`,
    options:["Flask A","Flask B","Flask C","Flask D"]
  },
  {
    r:"DSE/13/1A/25", p:79, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>A small amount of powdered calcium carbonate was added to excess hydrochloric acid and the volume of gas liberated was recorded.</p><p class="equation">CaCO<sub>3</sub>(s) + 2HCl(aq) → CaCl<sub>2</sub>(aq) + H<sub>2</sub>O(l) + CO<sub>2</sub>(g)</p><p>The first graph shows the volume of gas liberated, <em>V</em>, at different times, <em>t</em>.</p>`,
    afterDiagram:`<p>The experiment was repeated under the same conditions using the same mass of calcium carbonate granules instead of powdered calcium carbonate. Which graph best represents the repeated experiment?</p>`,
    options:["Graph A","Graph B","Graph C","Graph D"],
    diagrams:[{src:"topic9-assets/q15.jpg",crop:[1458,1311,485,195,555,315],label:"Original volume-time graph for powdered calcium carbonate"},{src:"topic9-assets/q15.jpg",crop:[1458,1311,175,620,1120,680],label:"Graph choices A-D for the repeated experiment"}]
  },
  {
    r:"DSE/23/1A/25", p:73, a:1, strand:"Factors affecting reaction rate",
    stem:`<p>To investigate the decomposition of H<sub>2</sub>O<sub>2</sub>(aq) to form O<sub>2</sub>(g), two experiments were carried out using the same amount of a suitable catalyst at room conditions.</p><table class="data-table"><thead><tr><th>Experiment</th><th>Concentration of H<sub>2</sub>O<sub>2</sub>(aq) / M</th><th>Volume of H<sub>2</sub>O<sub>2</sub>(aq) / cm<sup>3</sup></th></tr></thead><tbody><tr><th>I</th><td>1.0</td><td>25</td></tr><tr><th>II</th><td>0.5</td><td>50</td></tr></tbody></table><p>Which graph correctly shows the variation in the volume of O<sub>2</sub>(g) evolved with time?</p>`,
    options:["Graph A","Graph B","Graph C","Graph D"],
    diagrams:[{src:"topic9-assets/q16.jpg",crop:[1458,832,170,340,1170,480],label:"Graph choices A-D comparing Experiments I and II"}]
  },
  {
    r:"DSE/15/1A/28", p:78, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>Which pair of chemicals, upon mixing at the same temperature, has the highest rate of gas formation?</p>`,
    options:["0.10 g of Zn powder and 100 cm³ of 1.0 M HCl(aq)","0.10 g of Zn granules and 200 cm³ of 1.0 M HCl(aq)","0.10 g of Zn granules and 200 cm³ of 1.0 M H₂SO₄(aq)","0.10 g of Zn powder and 100 cm³ of 1.0 M H₂SO₄(aq)"]
  },
  {
    r:"DSE/14/1A/25", p:73, a:0, strand:"Factors affecting reaction rate",
    stem:`<p>H<sub>2</sub>O<sub>2</sub>(aq) decomposes into H<sub>2</sub>O(l) and O<sub>2</sub>(g) in the presence of MnO<sub>2</sub>(s). Two experiments are performed under the same conditions, except that 50 cm<sup>3</sup> of 2 M H<sub>2</sub>O<sub>2</sub>(aq) is used in Experiment (1), while 100 cm<sup>3</sup> of 1 M H<sub>2</sub>O<sub>2</sub>(aq) is used in Experiment (2). Which combination is correct?</p><table class="option-table"><thead><tr><th></th><th>Rate of formation of O<sub>2</sub>(g) at the start</th><th>Total volume of O<sub>2</sub>(g) formed</th></tr></thead><tbody><tr><th>A</th><td>Experiment (1) &gt; Experiment (2)</td><td>Experiment (1) = Experiment (2)</td></tr><tr><th>B</th><td>Experiment (1) &gt; Experiment (2)</td><td>Experiment (1) &gt; Experiment (2)</td></tr><tr><th>C</th><td>Experiment (1) = Experiment (2)</td><td>Experiment (1) = Experiment (2)</td></tr><tr><th>D</th><td>Experiment (1) = Experiment (2)</td><td>Experiment (1) &gt; Experiment (2)</td></tr></tbody></table>`,
    options:["Combination A","Combination B","Combination C","Combination D"]
  },
  {
    r:"DSE/18/1A/33", p:58, a:0, strand:"Factors affecting reaction rate",
    stem:`<p>Consider the following two reactions.</p><table class="data-table"><thead><tr><th>Reaction</th><th>Reactants</th></tr></thead><tbody><tr><th>(I)</th><td>1.0 g of Na<sub>2</sub>CO<sub>3</sub>(s) + 100.0 cm<sup>3</sup> of 1.0 M HCl(aq)</td></tr><tr><th>(II)</th><td>1.0 g of Na<sub>2</sub>CO<sub>3</sub>(s) + 100.0 cm<sup>3</sup> of 1.0 M CH<sub>3</sub>COOH(aq)</td></tr></tbody></table><p>Which statements are correct if the reactions are performed under the same experimental conditions?</p><p class="note">Relative atomic masses: C = 12.0, O = 16.0, Na = 23.0</p><ol class="statements"><li>The decrease in mass for the two reaction mixtures is the same.</li><li>The initial rate of Reaction (I) is higher than that of Reaction (II).</li><li>The heat given out for the two reactions is the same.</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  },
  {
    r:"DSE/16/1A/33", p:72, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>Which statements are correct?</p><ol class="statements"><li>Magnesium oxide dissolves faster in 1 M HCl(aq) than in 1 M CH<sub>3</sub>CO<sub>2</sub>H(aq).</li><li>Powdered marble dissolves faster in 1 M HCl(aq) than granular marble does.</li><li>H<sub>2</sub>O<sub>2</sub>(aq) decomposes faster in the presence of MnO<sub>2</sub>(s) than without MnO<sub>2</sub>(s).</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  },
  {
    r:"DSE/18/1A/25", p:76, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>100 cm<sup>3</sup> of 1.0 M HCl(aq) reacts with excess zinc granules, giving curve <strong>A</strong> in the graph.</p>`,
    afterDiagram:`<p>Which change may give curve <strong>B</strong>?</p>`,
    options:["Increase the temperature by 5 °C.","Use the same mass of zinc powder instead of zinc granules.","Use 200 cm³ of 0.80 M HCl(aq) instead of 100 cm³ of 1.0 M HCl(aq).","Use 50 cm³ of 1.50 M HCl(aq) instead of 100 cm³ of 1.0 M HCl(aq)."],
    diagrams:[{src:"topic9-assets/q21.jpg",crop:[1458,663,440,125,640,330],label:"Curves A and B for the volume of hydrogen formed against time"}]
  },
  {
    r:"DSE/22/1A/26", p:69, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>50 cm<sup>3</sup> of 0.10 M HCl(aq) reacts with excess calcium carbonate powder in an open conical flask, giving curve <strong>X</strong> in the graph.</p>`,
    afterDiagram:`<p>Which change may give curve <strong>Y</strong>?</p>`,
    options:["Increase the temperature by 10 °C.","Use 25 cm³ of 0.10 M HCl(aq) instead of 50 cm³ of 0.10 M HCl(aq).","Use 50 cm³ of 0.05 M HCl(aq) instead of 50 cm³ of 0.10 M HCl(aq).","Use the same mass of calcium carbonate granules instead of calcium carbonate powder."],
    diagrams:[{src:"topic9-assets/q22.jpg",crop:[1458,736,390,120,720,400],label:"Curves X and Y for decrease in mass against time"}]
  },
  {
    r:"DSE/24/1A/27", p:79, a:1, strand:"Factors affecting reaction rate",
    stem:`<p>Consider the rate and the collisions between particles in the following reaction:</p><p class="equation">2SO<sub>2</sub>(g) + O<sub>2</sub>(g) → 2SO<sub>3</sub>(g)</p><p>Which combination is correct when the concentration of SO<sub>2</sub>(g) is increased at a constant temperature?</p><table class="option-table"><thead><tr><th></th><th>Rate of reaction</th><th>Collisions between particles</th></tr></thead><tbody><tr><th>A</th><td>increases</td><td>have more energy on average</td></tr><tr><th>B</th><td>increases</td><td>have higher frequency</td></tr><tr><th>C</th><td>remains unchanged</td><td>have more energy on average</td></tr><tr><th>D</th><td>remains unchanged</td><td>have higher frequency</td></tr></tbody></table>`,
    options:["Combination A","Combination B","Combination C","Combination D"]
  },
  {
    r:"DSE/19/1A/34", p:64, a:3, strand:"Factors affecting reaction rate",
    stem:`<p>Consider the following reaction:</p><p class="equation">2H<sub>2</sub>O<sub>2</sub>(aq) <span class="reaction-arrow"><span>MnO<sub>2</sub>(s)</span>→</span> 2H<sub>2</sub>O(l) + O<sub>2</sub>(g)</p><p>Which statements are correct if the concentration of H<sub>2</sub>O<sub>2</sub>(aq) changes from 2 M to 1 M while the other conditions remain unchanged?</p><ol class="statements"><li>The consumption of MnO<sub>2</sub>(s) will decrease.</li><li>The rate of formation of O<sub>2</sub>(g) will decrease.</li><li>The volume of O<sub>2</sub>(g) formed will decrease.</li></ol>`,
    options:["(1) only","(2) only","(1) and (3) only","(2) and (3) only"]
  },
  {
    r:"DSE/20/1A/36", p:86, a:0, strand:"Catalysis & relative reaction speed",
    stem:`<p>Consider the following statements and choose the best answer.</p><table class="statement-table"><thead><tr><th>1st statement</th><th>2nd statement</th></tr></thead><tbody><tr><td>The rate of conversion from glucose to ethanol is increased by adding yeast.</td><td>The conversion from glucose to ethanol is catalyzed by enzymes in yeast.</td></tr></tbody></table>`,
    options:assertionOptions
  },
  {
    r:"DSE/23/1A/28", p:30, a:0, strand:"Catalysis & relative reaction speed",
    stem:`<p>Which chemical reaction is the fastest at room conditions?</p>`,
    options:["AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)","Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)","4Fe(s) + 3O₂(g) → 2Fe₂O₃(s)","CH₄(g) + Br₂(in organic solvent) → CH₃Br(g) + HBr(g), in light"]
  },
  {
    r:"DSE/20/1A/25", p:84, a:2, strand:"Integrated quantitative chemistry",
    stem:`<p>Consider the following reaction:</p><p class="equation">4H<sub>2</sub>(g) + Fe<sub>3</sub>O<sub>4</sub>(s) → 3Fe(s) + 4H<sub>2</sub>O(l)</p><p>What is the minimum volume of H<sub>2</sub>(g) at room conditions required to form 0.168 g of Fe(s)?</p><p class="note">Molar volume of gas at room conditions = 24 dm<sup>3</sup>; relative atomic mass: Fe = 55.8</p>`,
    options:["24 cm³","48 cm³","96 cm³","192 cm³"]
  },
  {
    r:"DSE/19/1A/28", p:66, a:3, strand:"Integrated quantitative chemistry",
    stem:`<p>Consider the following reaction:</p><p class="equation">2NaOH(aq) + N<sub>2</sub>O<sub>4</sub>(g) → NaNO<sub>3</sub>(aq) + NaNO<sub>2</sub>(aq) + H<sub>2</sub>O(l)</p><p>What is the minimum volume of 0.5 M NaOH(aq) needed to react completely with 480 cm<sup>3</sup> of N<sub>2</sub>O<sub>4</sub>(g) at room conditions?</p><p class="note">Molar volume of gas at room conditions = 24 dm<sup>3</sup></p>`,
    options:["8 cm³","12.5 cm³","40 cm³","80 cm³"]
  },
  {
    r:"DSE/12/1A/25", p:69, a:0, strand:"Integrated quantitative chemistry",
    stem:`<p>What is the theoretical volume of carbon dioxide obtainable at room temperature and pressure when 1.2 g of Na<sub>2</sub>CO<sub>3</sub>(s) reacts with 50 cm<sup>3</sup> of 1.0 M HNO<sub>3</sub>(aq)?</p><p class="note">Molar volume of gas at room temperature and pressure = 24 dm<sup>3</sup>; relative atomic masses: H = 1.0, C = 12.0, N = 14.0, O = 16.0, Na = 23.0</p>`,
    options:["272 cm³","544 cm³","600 cm³","1200 cm³"]
  },
  {
    r:"DSE/23/1A/26", p:46, a:2, strand:"Integrated quantitative chemistry",
    stem:`<p>Consider the following reaction:</p><p class="equation">C<sub>3</sub>H<sub>8</sub>(g) + 5O<sub>2</sub>(g) → 3CO<sub>2</sub>(g) + 4H<sub>2</sub>O(l)</p><p>If 100 cm<sup>3</sup> of C<sub>3</sub>H<sub>8</sub>(g) burns in 600 cm<sup>3</sup> of O<sub>2</sub>(g), what is the volume of the resulting gaseous mixture at room conditions?</p><p class="note">Molar volume of gas at room conditions = 24 dm<sup>3</sup></p>`,
    options:["800 cm³","700 cm³","400 cm³","300 cm³"]
  },
  {
    r:"DSE/22/1A/25", p:59, a:1, strand:"Integrated quantitative chemistry",
    stem:`<p>A mixture consists of methane and ethane. 50 cm<sup>3</sup> of this mixture burns completely in oxygen to form 80 cm<sup>3</sup> of carbon dioxide at room conditions. What is the volume of methane in the mixture at room conditions?</p><p class="note">Molar volume of gas at room conditions = 24 dm<sup>3</sup></p>`,
    options:["10 cm³","20 cm³","30 cm³","40 cm³"]
  },
  {
    r:"DSE/15/1A/36", p:60, a:2, strand:"Integrated quantitative chemistry",
    stem:`<p>Consider the following statements and choose the best answer.</p><table class="statement-table"><thead><tr><th>1st statement</th><th>2nd statement</th></tr></thead><tbody><tr><td>At room conditions, the volume of 1 mol of SO<sub>2</sub>(g) is larger than that of 1 mol of N<sub>2</sub>(g).</td><td>The number of atoms constituting 1 mol of SO<sub>2</sub>(g) is greater than that constituting 1 mol of N<sub>2</sub>(g).</td></tr></tbody></table>`,
    options:assertionOptions
  },
  {
    r:"DSE/18/1A/36", p:65, a:2, strand:"Integrated quantitative chemistry",
    stem:`<p>Consider the following statements and choose the best answer.</p><table class="statement-table"><thead><tr><th>1st statement</th><th>2nd statement</th></tr></thead><tbody><tr><td>The molar volume of bromine is larger than that of fluorine at room temperature and pressure.</td><td>The molecular size of bromine is larger than that of fluorine.</td></tr></tbody></table>`,
    options:assertionOptions
  },
  {
    r:"DSE/26/1A/35", p:null, a:3, strand:"Rate and amount of product",
    stem:`<p>Consider the following reactions.</p><table class="data-table"><thead><tr><th>Reaction</th><th>Reactants</th></tr></thead><tbody><tr><th>1</th><td>0.5 g of powdered Ca(s) + 50.0 cm<sup>3</sup> of 1.0 M HCl(aq)</td></tr><tr><th>2</th><td>0.5 g of powdered Zn(s) + 50.0 cm<sup>3</sup> of 1.0 M HCl(aq)</td></tr></tbody></table><p>The reactions are performed under the same experimental conditions. Which statements are correct?</p><p class="note">Relative atomic masses: Ca = 40.1, Zn = 65.4</p><ol class="statements"><li>The initial rate of Reaction 1 is higher than that of Reaction 2.</li><li>Both give a clear solution after the reactions are completed.</li><li>The volume of gas produced from Reaction 1 is larger than that from Reaction 2 after the reactions are completed.</li></ol>`,
    options:["(1) and (2) only","(1) and (3) only","(2) and (3) only","(1), (2) and (3)"]
  }
];

const embeddedDiagrams=[
  ['q01',1180,645],['q02',1185,585],['q03',760,535],['q05',540,235],
  ['q06',790,325],['q11',660,320],['q12',800,325],['q15-main',555,315],
  ['q15-options',1120,680],['q16',1170,480],['q21',640,330],['q22',720,400]
];
let embeddedDiagramIndex=0;
window.TOPIC9_QUESTIONS.forEach((q)=>{
  (q.diagrams||[]).forEach((diagram)=>{
    const [key,width,height]=embeddedDiagrams[embeddedDiagramIndex++];
    diagram.src=window.TOPIC9_DIAGRAMS[key];
    diagram.crop=[width,height,0,0,width,height];
  });
});

const markingPages=[4,5,6,6,7,7,8,8,9,9,10,11,12,13,14,15,15,16,16,17,17,18,18,19,19,19,20,20,21,21,22,22,23,25];
const markingY=[0,1649,3298,3298,4947,4947,6596,6596,8245,8245,9894,11543,0,1649,3298,4947,4947,6596,6596,8245,8245,9894,9894,11543,11543,11543,0,0,1649,1649,3298,3298,4947,6596];
window.TOPIC9_QUESTIONS.forEach((q,i)=>{
  const group=i<12?0:i<26?1:2;
  const totals=[13174,13174,8227];
  q.marking={src:`topic9-atlases/marking-0${group+1}.jpg`,y:markingY[i],h:1631,w:1154,total:totals[group],page:markingPages[i]};
});
