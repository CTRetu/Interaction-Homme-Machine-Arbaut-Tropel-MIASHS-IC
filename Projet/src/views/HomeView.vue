<template>
  <div class="home">

    <!-- Bandeau d’intro -->
    <section class="intro-section">
      <h1>TOP CRYPTO</h1> <br/>
      <p>
        <h2>Bienvenue sur Top Crypto !</h2> <br/>
        Ceci est un site de visualisation des crypto-monnaies les plus importantes du marché actuel. <br/><br/>
        <h3>Améliorez vos suivis et analyses avec Top Crypto !</h3>
      </p>
    </section>

    <!-- Section : Gagnants / Tendance -->
    <section class="flex-section">

      <div class="card">
        <h2>Tendance Générale</h2>
        <p>(Zone Tendance)</p>
      </div>

    <div class="card">
      <h2>Grands Gagnants 24H</h2>

      <table class="gagnants-table">
        <tbody>
          <tr>
            <td>1</td>
            <td>Bitcoin</td>
            <td><span class="trend-up">+12%</span></td>
            <td>$45 780</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ethereum</td>
            <td><span class="trend-up">+9%</span></td>
            <td>$25 678</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Solana</td>
            <td><span class="trend-up">+7%</span></td>
            <td>$12 345</td>
          </tr>
        </tbody>
      </table>
    </div>


      <div class="card">
        <h2>Grands Gagnants 12H</h2>
          <table class="gagnants-table">
            <tbody>
              <tr>
                <td>1</td>
                <td>Bitcoin</td>
                <td><span class="trend-up">+8%</span></td>
                <td>$30 055</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ethereum</td>
                <td><span class="trend-up">+6%</span></td>
                <td>$23 202</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Solana</td>
                <td><span class="trend-up">+6%</span></td>
                <td>$11 256</td>
              </tr>
            </tbody>
        </table>
      </div>
    </section>

    <!-- Section : Focus TOP 1 -->
    <section class="card big-card">
      <h2>Focus sur le TOP 1</h2>
    </section>

    <!-- Section : Tableau des cryptos -->
    <section class="card">
      <h2>Tableau récapitulatif des 10 crypto-monnaies les plus importantes</h2>

      <div class="crypto-table-wrapper">
        <table class="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Cours</th>
              <th>12 H</th>
              <th>24 H</th>
              <th>3 J</th>
              <th>7 J</th>
              <th>Volume 24 H</th>
              <th>Capitalisation</th>
              <th>Évolution 7 J</th>
            </tr>
          </thead>

          <tbody>

            <!-- 1 : Bitcoin -->
            <tr>
              <td>1</td>
              <td><img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" class="coin-ico"> Bitcoin</td>
              <td>150 576 $US</td>
              <td class="up">1,01%</td>
              <td class="up">1,23%</td>
              <td class="up">1,32%</td>
              <td class="up">1,25%</td>
              <td>54 877</td>
              <td>156 967 890</td>
              <td></td>
            </tr>

            <!-- 2 : Ethereum -->
            <tr>
              <td>2</td>
              <td><img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" class="coin-ico"> Ethereum</td>
              <td>140 356 $US</td>
              <td class="up">1,05%</td>
              <td class="up">1,02%</td>
              <td class="up">1,09%</td>
              <td class="down">1,04%</td>
              <td>34 923</td>
              <td>134 567 098</td>
              <td></td>
            </tr>

            <!-- 3 : Tether -->
            <tr>
              <td>3</td>
              <td><img src="https://cryptologos.cc/logos/tether-usdt-logo.png" class="coin-ico"> Tether</td>
              <td>135 785 $US</td>
              <td class="down">0,39%</td>
              <td class="up">1,34%</td>
              <td class="down">0,30%</td>
              <td class="up">1,24%</td>
              <td>56 844</td>
              <td>102 356 765</td>
              <td></td>
            </tr>

            <!-- 4 : BNB -->
            <tr>
              <td>4</td>
              <td><img src="https://cryptologos.cc/logos/bnb-bnb-logo.png" class="coin-ico"> BNB</td>
              <td>134 543 $US</td>
              <td class="down">0,02%</td>
              <td class="down">0,30%</td>
              <td class="up">1,02%</td>
              <td class="down">0,32%</td>
              <td>45 897</td>
              <td>102 673 637</td>
              <td></td>
            </tr>

            <!-- 5 : Solana -->
            <tr>
              <td>5</td>
              <td><img src="https://cryptologos.cc/logos/solana-sol-logo.png" class="coin-ico"> Solana</td>
              <td>134 521 $US</td>
              <td class="up">1,09%</td>
              <td class="up">1,01%</td>
              <td class="up">1,09%</td>
              <td class="up">1,01%</td>
              <td>34 655</td>
              <td>102 630 667</td>
              <td></td>
            </tr>

            <!-- 6 : USDC -->
            <tr>
              <td>6</td>
              <td><img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" class="coin-ico"> USDC</td>
              <td>124 908 $US</td>
              <td class="up">1,07%</td>
              <td class="down">1,23%</td>
              <td class="down">1,29%</td>
              <td class="down">1,27%</td>
              <td>23 543</td>
              <td>101 123 897</td>
              <td></td>
            </tr>

            <!-- 7 : Dogecoin -->
            <tr>
              <td>7</td>
              <td><img src="https://cryptologos.cc/logos/dogecoin-doge-logo.png" class="coin-ico"> Dogecoin</td>
              <td>121 432 $US</td>
              <td class="up">1,42%</td>
              <td class="down">1,10%</td>
              <td class="up">1,23%</td>
              <td class="up">1,32%</td>
              <td>68 549</td>
              <td>104 678 453</td>
              <td></td>
            </tr>

            <!-- 8 : Lido Staked Ether -->
            <tr>
              <td>8</td>
              <td><img src="https://cryptologos.cc/logos/lido-dao-ldo-logo.png" class="coin-ico"> Lido Staked Ether</td>
              <td>121 358 $US</td>
              <td class="down">0,78%</td>
              <td class="up">1,63%</td>
              <td class="up">1,24%</td>
              <td class="up">1,09%</td>
              <td>45 456</td>
              <td>105 387 889</td>
              <td></td>
            </tr>

            <!-- 9 : XRP -->
            <tr>
              <td>9</td>
              <td><img src="https://cryptologos.cc/logos/xrp-xrp-logo.png" class="coin-ico"> XRP</td>
              <td>121 201 $US</td>
              <td class="up">1,01%</td>
              <td class="up">1,03%</td>
              <td class="up">1,06%</td>
              <td class="down">0,08%</td>
              <td>45 653</td>
              <td>106 789 678</td>
              <td></td>
            </tr>

            <!-- 10 : Cardano -->
            <tr>
              <td>10</td>
              <td><img src="https://cryptologos.cc/logos/cardano-ada-logo.png" class="coin-ico"> Cardano</td>
              <td>120 598 $US</td>
              <td class="up">0,51%</td>
              <td class="down">0,09%</td>
              <td class="down">0,06%</td>
              <td class="down">0,12%</td>
              <td>23 987</td>
              <td>102 565 789</td>
              <td></td>
            </tr>

          </tbody>
        </table>
        <div class="table-footer">
          <RouterLink to="/crypto-table" class="btn-primary btn-see-more">
            Voir plus
          </RouterLink>
        </div>
      </div>
    </section>


    <!-- Section : Communauté -->
    <section class="card">
      <h2>Communauté</h2>
      <p>(Zone articles / commentaires)</p>
    </section>

  </div>
</template>

<script setup>
// pas besoin de script pour le moment
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0;
}

/* Intro */
.intro-section {
  margin-bottom: 20px;
}

.intro-section h1 {
  font-size: 32px;
  font-weight: 800;
  color: var(--primary);
}

.intro-section p {
  max-width: 600px;
  font-size: 15px;
  color: var(--text-light);
}

/* Section horizontale */
.flex-section {
  display: flex;
  gap: 20px;
}

/* Cards */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 20px;
  border-radius: 12px;
  flex: 1;
}

.big-card {
  min-height: 250px;
}
</style>
