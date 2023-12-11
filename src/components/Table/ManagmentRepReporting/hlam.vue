<!-- <template>
    <div>
        <tr>
                            <td v-if="CheckValue(wagon_type)" style="background: lightblue;" :colspan="HowManyNewCells">
                                Выручка от предоставления вагонов под погрузку
                            </td>
                        </tr>
                        <tr>
                            <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td v-if="CheckValue(wagon_type)"></td>
                        </tr>  -->
                        <!-- <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Выручка от сдачи в аренду</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Штрафы к получению</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Тариф</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Привлеченеи ПС</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Подготовка вагонов</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Прочие условно-переменные расходы</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Амортизация</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Расходы на аренду ПС</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Ремонт, сервисное обслуживание и з/ч</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Расходы на оплату труда (произв.)</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Прочие условно-постоянные произв. Расходы</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td style="background: lightblue;" :colspan="HowManyNewCells">Операционная прибыль</td>
                            </tr>
                            <tr>
                                <td v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                                <td ></td>
                            </tr>
    </div>
</template>


<!--     <template v-for="predata in getNextKey(allDataByWagonType)">
                             <tr>
                            <td  v-if="CheckValue(wagon_type)">{{ wagon_type }}</td>
                            <td>{{ predata }}</td>
                            <td>{{ allDataByWagonType[predata]['loading_revenue'] }}</td>
                            <td>{{ allDataByWagonType[predata]['rent_revenue'] }}</td>
                            <td>{{ allDataByWagonType[predata]['penalties'] }}</td>
                            <td>{{ allDataByWagonType[predata]['tariff'] }}</td>
                            <td>{{ allDataByWagonType[predata]['attraction'] }}</td>
                            <td>{{ allDataByWagonType[predata]['prepare'] }}</td>
                            <td>{{ allDataByWagonType[predata]['other_charges'] }}</td>
                            <td>{{ allDataByWagonType[predata]['amortization'] }}</td>
                            <td>{{ allDataByWagonType[predata]['rent_expenses'] }}</td>
                            <td>{{ allDataByWagonType[predata]['repair'] }}</td>
                            <td>{{ allDataByWagonType[predata]['salary'] }}</td>
                            <td>{{ allDataByWagonType[predata]['other_expenses'] }}</td>
                            <td>{{ allDataByWagonType[predata]['profit'] }}</td>
                         </tr> 

                        </template> -->