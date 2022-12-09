
//eval(el.plan) !!!

export function switch_deviation(el) {
    switch (el.number) {
        case 0:
            el.plan_formula = 'Number(this.data[0].plan)';
            el.fact_formula = 'Number(this.data[0].fact)';
            break
        case 1:
            el.plan_formula = 'Number(this.data[2].plan) + Number(this.data[3].plan) + Number(this.data[4].plan) + Number(this.data[5].plan)';
            el.fact_formula = 'Number(this.data[2].fact) + Number(this.data[3].fact) + Number(this.data[4].fact) + Number(this.data[5].fact)';
            break
        case 2:
            el.plan_formula = 'Number(this.data[2].plan)';
            el.fact_formula = 'Number(this.data[2].fact)';
            break
        case 3:
            el.plan_formula = 'Number(this.data[3].plan)';
            el.fact_formula = 'Number(this.data[3].fact)';
            break
        case 4:
            el.plan_formula = 'Number(this.data[4].plan)';
            el.fact_formula = 'Number(this.data[4].fact)';
            break
        case 5:
            el.plan_formula = 'Number(this.data[5].plan)';
            el.fact_formula = 'Number(this.data[5].fact)';
            break
        case 6:
            el.plan_formula = 'Number(this.data[0].plan) - Number(this.data[1].plan)';
            el.fact_formula = 'Number(this.data[0].fact) - Number(this.data[1].fact)';
            break
        case 7:
            el.plan_formula = 'Number(this.data[7].plan)';
            el.fact_formula = 'Number(this.data[7].fact)';
            break
        case 8:
            el.plan_formula = 'Number(this.data[9].plan) + Number(this.data[10].plan) + Number(this.data[11].plan) + Number(this.data[12].plan)';
            el.fact_formula = 'Number(this.data[9].fact) + Number(this.data[10].fact) + Number(this.data[11].fact) + Number(this.data[12].fact)';
            break
        case 9:
            el.plan_formula = 'Number(this.data[9].plan)';
            el.fact_formula = 'Number(this.data[9].fact)';
            break
        case 10:
            el.plan_formula = 'Number(this.data[10].plan)';
            el.fact_formula = 'Number(this.data[10].fact)';
            break
        case 11:
            el.plan_formula = 'Number(this.data[11].plan)';
            el.fact_formula = 'Number(this.data[11].fact)';
            break
        case 12:
            el.plan_formula = 'Number(this.data[12].plan)';
            el.fact_formula = 'Number(this.data[12].fact)';
            break
        case 13:
            el.plan_formula = 'Number(this.data[7].plan) - Number(this.data[8].plan)';
            el.fact_formula = 'Number(this.data[7].fact) - Number(this.data[8].fact)';
            break
        case 14:
            el.plan_formula = 'Number(this.data[6].plan) + Number(this.data[13].plan)';
            el.fact_formula = 'Number(this.data[6].fact) + Number(this.data[13].fact)';
            break
        case 15:
            el.plan_formula = 'Number(this.data[16].plan) - Number(this.data[20].plan)';
            el.fact_formula = 'Number(this.data[16].fact) - Number(this.data[20].fact)';
            break
        case 16:
            el.plan_formula = 'Number(this.data[17].plan) + Number(this.data[18].plan) + Number(this.data[19].plan)';
            el.fact_formula = 'Number(this.data[17].fact) + Number(this.data[18].fact) + Number(this.data[19].fact)';
            break
        case 17:
            el.plan_formula = 'Number(this.data[17].plan)';
            el.fact_formula = 'Number(this.data[17].fact)';
            break
        case 18:
            el.plan_formula = 'Number(this.data[18].plan)';
            el.fact_formula = 'Number(this.data[17].fact)';
            break
        case 19:
            el.plan_formula = 'Number(this.data[19].plan)';
            el.fact_formula = 'Number(this.data[17].fact)';
            break
        case 20:
            el.plan_formula = 'Number(this.data[21].plan) + Number(this.data[22].plan) + Number(this.data[23].plan)';
            el.fact_formula = 'Number(this.data[21].fact) + Number(this.data[22].fact) + Number(this.data[23].fact)';
            break
        case 21:
            el.plan_formula = 'Number(this.data[21].plan)';
            el.fact_formula = 'Number(this.data[21].fact)';
            break
        case 22:
            el.plan_formula = 'Number(this.data[22].plan)';
            el.fact_formula = 'Number(this.data[22].fact)';
            break
        case 23:
            el.plan_formula = 'Number(this.data[23].plan)';
            el.fact_formula = 'Number(this.data[23].fact)';
            break
        case 24:
            el.plan_formula = 'Number(this.data[25].plan) - Number(this.data[29].plan)';
            el.fact_formula = 'Number(this.data[25].fact) - Number(this.data[29].fact)';
            break
        case 25:
            el.plan_formula = 'Number(this.data[26].plan) + Number(this.data[27].plan) + Number(this.data[28].plan)';
            el.fact_formula = 'Number(this.data[26].fact) + Number(this.data[27].fact) + Number(this.data[28].fact)';
            break
        case 26:
            el.plan_formula = 'Number(this.data[26].plan)';
            el.fact_formula = 'Number(this.data[26].fact)';
            break
        case 27:
            el.plan_formula = 'Number(this.data[27].plan)';
            el.fact_formula = 'Number(this.data[27].fact)';
            break
        case 28:
            el.plan_formula = 'Number(this.data[28].plan)';
            el.fact_formula = 'Number(this.data[28].fact)';
            break
        case 29:
            el.plan_formula = 'Number(this.data[30].plan) + Number(this.data[31].plan) + Number(this.data[32].plan)';
            el.fact_formula = 'Number(this.data[30].fact) + Number(this.data[31].fact) + Number(this.data[32].fact)';
            break
        case 30:
            el.plan_formula = 'Number(this.data[30].plan)';
            el.fact_formula = 'Number(this.data[30].fact)';
            break
        case 31:
            el.plan_formula = 'Number(this.data[31].plan)';
            el.fact_formula = 'Number(this.data[31].fact)';
            break
        case 32:
            el.plan_formula = 'Number(this.data[32].plan)';
            el.fact_formula = 'Number(this.data[32].fact)';
            break
        case 33:
            el.plan_formula = 'Number(this.data[34].plan) - Number(this.data[38].plan)';
            el.fact_formula = 'Number(this.data[34].fact) - Number(this.data[38].fact)';
            break
        case 34:
            el.plan_formula = 'Number(this.data[35].plan) + Number(this.data[36].plan) + Number(this.data[37].plan)';
            el.fact_formula = 'Number(this.data[35].fact) + Number(this.data[36].fact) + Number(this.data[37].fact)';
            break
        case 35:
            el.plan_formula = 'Number(this.data[35].plan)';
            el.fact_formula = 'Number(this.data[35].fact)';
            break
        case 36:
            el.plan_formula = 'Number(this.data[36].plan)';
            el.fact_formula = 'Number(this.data[36].fact)';
            break
        case 37:
            el.plan_formula = 'Number(this.data[37].plan)';
            el.fact_formula = 'Number(this.data[37].fact)';
            break
        case 38:
            el.plan_formula = 'Number(this.data[39].plan) + Number(this.data[40].plan) + Number(this.data[41].plan)';
            el.fact_formula = 'Number(this.data[39].fact) + Number(this.data[40].fact) + Number(this.data[41].fact)';
            break
        case 39:
            el.plan_formula = 'Number(this.data[39].plan)';
            el.fact_formula = 'Number(this.data[39].fact)';
            break
        case 40:
            el.plan_formula = 'Number(this.data[40].plan)';
            el.fact_formula = 'Number(this.data[40].fact)';
            break
        case 41:
            el.plan_formula = 'Number(this.data[41].plan)';
            el.fact_formula = 'Number(this.data[41].fact)';
            break
        case 42:
            el.plan_formula = 'Number(this.data[14].plan) + Number(this.data[15].plan) + Number(this.data[24].plan) + Number(this.data[33].plan)';
            el.fact_formula = 'Number(this.data[14].fact) + Number(this.data[15].fact) + Number(this.data[24].fact) + Number(this.data[33].fact)';
            break
            // пропустил
        case 43:
            el.plan_formula = 'Number(this.data[6].plan) + Number(this.data[17].plan) + Number(this.data[19].plan) * Number(this.data[89].plan) - Number(this.data[21].plan) - Number(this.data[23].plan) * Number(this.data[89].plan) + Number(this.data[26].plan) + Number(this.data[28].plan) * Number(this.data[89].plan) - Number(this.data[30].plan) - Number(this.data[32].plan) * Number(this.data[89].plan) + Number(this.data[35].plan) + Number(this.data[37].plan) * Number(this.data[89].plan) - Number(this.data[39].plan) - Number(this.data[41].plan) * Number(this.data[89].plan)';
            el.fact_formula = 'Number(this.data[6].fact) + Number(this.data[17].fact) + Number(this.data[19].fact) * Number(this.data[89].fact) - Number(this.data[21].fact) - Number(this.data[23].fact) * Number(this.data[89].fact) + Number(this.data[26].fact) + Number(this.data[28].fact) * Number(this.data[89].fact) - Number(this.data[30].fact) - Number(this.data[32].fact) * Number(this.data[89].fact) + Number(this.data[35].fact) + Number(this.data[37].fact) * Number(this.data[89].fact) - Number(this.data[39].fact) - Number(this.data[41].fact) * Number(this.data[89].fact)';
            break
            // пропустил
        case 44:
            el.plan_formula = 'Number(this.data[13].plan) + Number(this.data[18].plan) + Number(this.data[19].plan) * Number(this.data[90].plan) - Number(this.data[22].plan) - Number(this.data[23].plan) * Number(this.data[90].plan) + Number(this.data[27].plan) + Number(this.data[28].plan) * Number(this.data[90].plan) - Number(this.data[31].plan) - Number(this.data[32].plan) * Number(this.data[90].plan) + Number(this.data[36].plan) + Number(this.data[37].plan) * Number(this.data[90].plan) - Number(this.data[40].plan) - Number(this.data[41].plan) * Number(this.data[90].plan)';
            el.fact_formula = 'Number(this.data[13].fact) + Number(this.data[18].fact) + Number(this.data[19].fact) * Number(this.data[90].fact) - Number(this.data[22].fact) - Number(this.data[23].fact) * Number(this.data[90].fact) + Number(this.data[27].fact) + Number(this.data[28].fact) * Number(this.data[90].fact) - Number(this.data[31].fact) - Number(this.data[32].fact) * Number(this.data[90].fact) + Number(this.data[36].fact) + Number(this.data[37].fact) * Number(this.data[90].fact) - Number(this.data[40].fact) - Number(this.data[41].fact) * Number(this.data[90].fact)';
            break
        case 45:
            el.plan_formula = 'Number(this.data[45].plan)';
            el.fact_formula = 'Number(this.data[45].fact)';
            break
        case 46:
            el.plan_formula = 'Number(this.data[46].plan)';
            el.fact_formula = 'Number(this.data[46].fact)';
            break
        case 47:
            el.plan_formula = 'Number(this.data[47].plan)';
            el.fact_formula = 'Number(this.data[47].fact)';
            break
        case 48:
            el.plan_formula = 'Number(this.data[48].plan)';
            el.fact_formula = 'Number(this.data[48].fact)';
            break
        case 49:
            el.plan_formula = 'Number(this.data[49].plan)';
            el.fact_formula = 'Number(this.data[49].fact)';
            break
        case 50:
            el.plan_formula = 'Number(this.data[50].plan)';
            el.fact_formula = 'Number(this.data[50].fact)';
            break
        case 51:
            el.plan_formula = 'Number(this.data[51].plan)';
            el.fact_formula = 'Number(this.data[51].fact)';
            break
        case 52:
            el.plan_formula = 'Number(this.data[53].plan) + Number(this.data[57].plan)';
            el.fact_formula = 'Number(this.data[53].fact) + Number(this.data[57].fact)';
            break
        case 53:
            el.plan_formula = 'Number(this.data[54].plan) + Number(this.data[55].plan) + Number(this.data[56].plan)';
            el.fact_formula = 'Number(this.data[54].fact) + Number(this.data[55].fact) + Number(this.data[56].fact)';
            break
        case 54:
            el.plan_formula = 'Number(this.data[54].plan)';
            el.fact_formula = 'Number(this.data[54].fact)';
            break
        case 55:
            el.plan_formula = 'Number(this.data[55].plan)';
            el.fact_formula = 'Number(this.data[55].fact)';
            break
        case 56:
            el.plan_formula = 'Number(this.data[56].plan)';
            el.fact_formula = 'Number(this.data[56].fact)';
            break
        case 57:
            el.plan_formula = 'Number(this.data[58].plan) + Number(this.data[59].plan) + Number(this.data[60].plan)';
            el.fact_formula = 'Number(this.data[58].fact) + Number(this.data[59].fact) + Number(this.data[60].fact)';
            break
        case 58:
            el.plan_formula = 'Number(this.data[58].plan)';
            el.fact_formula = 'Number(this.data[58].fact)';
            break
        case 59:
            el.plan_formula = 'Number(this.data[59].plan)';
            el.fact_formula = 'Number(this.data[59].fact)';
            break
        case 60:
            el.plan_formula = 'Number(this.data[60].plan)';
            el.fact_formula = 'Number(this.data[60].fact)';
            break
        case 61:
            el.plan_formula = 'Number(this.data[42].plan) - Number(this.data[45].plan) + Number(this.data[46].plan) + Number(this.data[47].plan) + Number(this.data[48].plan) + Number(this.data[49].plan) + Number(this.data[50].plan) + Number(this.data[51].plan) + Number(this.data[52].plan)';
            el.fact_formula = 'Number(this.data[42].fact) - Number(this.data[45].fact) + Number(this.data[46].fact) + Number(this.data[47].fact) + Number(this.data[48].fact) + Number(this.data[49].fact) + Number(this.data[50].fact) + Number(this.data[51].fact) + Number(this.data[52].fact)';
            break
            // Здесь деление согласно формуле
        case 62:
            el.plan_formula = 'Number(this.data[64].plan) - Number(this.data[67].plan)';
            el.fact_formula = 'Number(this.data[64].fact) - Number(this.data[67].fact)';
            break
        case 63:
            el.plan_formula = 'Number(this.data[64].plan) + Number(this.data[65].plan) + Number(this.data[66].plan)';
            el.fact_formula = 'Number(this.data[64].fact) + Number(this.data[65].fact) + Number(this.data[66].fact)';
            break
        case 64:
            el.plan_formula = 'Number(this.data[64].plan)';
            el.fact_formula = 'Number(this.data[64].fact)';
            break
        case 65:
            el.plan_formula = 'Number(this.data[65].plan)';
            el.fact_formula = 'Number(this.data[65].fact)';
            break
        case 66:
            el.plan_formula = 'Number(this.data[66].plan)';
            el.fact_formula = 'Number(this.data[66].fact)';
            break
        case 67:
            el.plan_formula = 'Number(this.data[68].plan) + Number(this.data[69].plan) + Number(this.data[70].plan)';
            el.fact_formula = 'Number(this.data[68].fact) + Number(this.data[69].fact) + Number(this.data[70].fact)';
            break
        case 68:
            el.plan_formula = 'Number(this.data[68].plan)';
            el.fact_formula = 'Number(this.data[68].fact)';
            break
        case 69:
            el.plan_formula = 'Number(this.data[69].plan)';
            el.fact_formula = 'Number(this.data[69].fact)';
            break
        case 70:
            el.plan_formula = 'Number(this.data[70].plan)';
            el.fact_formula = 'Number(this.data[70].fact)';
            break
        case 71:
            el.plan_formula = 'Number(this.data[61].plan) + Number(this.data[62].plan)';
            el.fact_formula = 'Number(this.data[61].fact) + Number(this.data[62].fact)';
            break
        case 72:
            el.plan_formula = 'Number(this.data[73].plan) - (Number(this.data[74].plan) + Number(this.data[75].plan) + Number(this.data[76].plan) + Number(this.data[77].plan) + Number(this.data[78].plan))';
            el.fact_formula = 'Number(this.data[73].fact) - (Number(this.data[74].fact) + Number(this.data[75].fact) + Number(this.data[76].fact) + Number(this.data[77].fact) + Number(this.data[78].plan))';
            break
        case 73:
            el.plan_formula = 'Number(this.data[73].plan)';
            el.fact_formula = 'Number(this.data[73].fact)';
            break
        case 74:
            el.plan_formula = 'Number(this.data[74].plan)';
            el.fact_formula = 'Number(this.data[74].fact)';
            break
        case 75:
            el.plan_formula = 'Number(this.data[75].plan)';
            el.fact_formula = 'Number(this.data[75].fact)';
            break
        case 76:
            el.plan_formula = 'Number(this.data[76].plan)';
            el.fact_formula = 'Number(this.data[76].fact)';
            break
        case 77:
            el.plan_formula = 'Number(this.data[77].plan)';
            el.fact_formula = 'Number(this.data[77].fact)';
            break
        case 78:
            el.plan_formula = 'Number(this.data[79].plan) + Number(this.data[80].plan) + Number(this.data[81].plan)';
            el.fact_formula = 'Number(this.data[79].fact) + Number(this.data[80].fact) + Number(this.data[81].fact)';
            break
        case 79:
            el.plan_formula = 'Number(this.data[79].plan)';
            el.fact_formula = 'Number(this.data[79].fact)';
            break
        case 80:
            el.plan_formula = 'Number(this.data[80].plan)';
            el.fact_formula = 'Number(this.data[80].fact)';
            break
        case 81:
            el.plan_formula = 'Number(this.data[81].plan)';
            el.fact_formula = 'Number(this.data[81].fact)';
            break
        case 82:
            el.plan_formula = 'Number(this.data[71].plan) + Number(this.data[72].plan)';
            el.fact_formula = 'Number(this.data[71].fact) + Number(this.data[72].fact)';
            break
        case 83:
            el.plan_formula = 'Number(this.data[83].plan)';
            el.fact_formula = 'Number(this.data[83].fact)';
            break
        case 84:
            el.plan_formula = 'Number(this.data[84].plan)';
            el.fact_formula = 'Number(this.data[84].fact)';
            break
        case 85:
            el.plan_formula = 'Number(this.data[85].plan)';
            el.fact_formula = 'Number(this.data[85].fact)';
            break
        case 86:
            el.plan_formula = 'Number(this.data[86].plan)';
            el.fact_formula = 'Number(this.data[86].fact)';
            break
        case 87:
            el.plan_formula = 'Number(this.data[85].plan) + Number(this.data[86].plan)';
            el.fact_formula = 'Number(this.data[85].fact) + Number(this.data[86].fact)';
            break
        case 88:
            el.plan_formula = 'Number(this.data[85].plan) / Number(this.data[87].plan) * 100';
            el.fact_formula = 'Number(this.data[85].fact) / Number(this.data[87].fact) * 100';
            break
        case 89:
            el.plan_formula = 'Number(this.data[86].plan) / Number(this.data[87].plan) * 100';
            el.fact_formula = 'Number(this.data[86].fact) / Number(this.data[87].fact) * 100';
            break
        case 90:
            el.plan_formula = 'Number(this.data[87].plan) / Number(this.data[87].plan) * 100';
            el.fact_formula = 'Number(this.data[87].fact) / Number(this.data[87].fact) * 100';
            break
            
    }

    //el.deviation = Number(el.fact) - Number(el.plan);
    return el
}

