<template>
  <div class="shipment-kind">
    <div class="shipment-kind__header">
      <h4 class="header-text">Груз</h4>
      <hr />
    </div>
    <div class="shipment-kind__content">
      <b-tabs content-class="mt-3" fill style="width: 100% !important">
        <b-tab title="ЕСТНГ" active>
          <div class="content">
            <p class="description">
              Единая тарифно-статистическая номенклатура грузов (ЕСТНГ)
            </p>
            <input type="text" class="textarea" placeholder="введите наименование груза"/>
            <div class="shipment-kind__content__table">
              <table class="table-sm table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Код ЕСТНГ</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Тарифный класс</th>
                    <th scope="col">МВН РЖД</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-tab>
        <b-tab title="ГНГ"><p>ГНГ</p></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

  <style scoped>
  .shipment-kind__content__table{
    margin-top: 2%;
    max-width: 95% !important;
    display: block;
    position: relative;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%,0);
  }
.textarea {
  background: white;
  border: 1px solid grey !important;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.content {
  width: 100%;
  min-height: 30vh;
}
.description {
  padding: 3% 0 2% 4%;
  font-weight: 700;
  font-size: 12px;
  font-family: "Montserrat", sans-serif;
}
.shipment-kind {
  margin-top: 8% !important;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  min-height: 55vh;
  width: 90%;
  border: 2px solid #1e86f5;
  border-radius: 10px;
}
.header-text {
  color: #444b54;
  padding-top: 2%;
  padding-left: 3%;
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
}
.shipment-kind__content {
  display: flex;
  width: 95%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #e3e5e7;
  border-radius: 5px;
  margin-bottom: 5%;
}
</style>