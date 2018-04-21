import React from 'react';

export function searchVal(s, data, key){

  let keylength = key.length;

  if(s !== ''){

    for(let j = 0; j < keylength; j++){


      var tempData = String(data[key[j]]);

        tempData = tempData.toLowerCase();

      if(tempData == s.toLowerCase()){
        return 1;
      }

    }
  }

  return 0;

}



export default function generateRow(product, key, searchValue, modCond, deleteCond, handleSubmitModify, handleSubmitDelete,doneCondition){


  let row = [];


  var datalength = product.length;

  for (var i = 0; i < datalength; i++){


    if(searchValue != ''){

      var checkCond = searchVal(searchValue, product[i] , key);

      if(checkCond == 0){

        continue;
      } else {

      }

    }


    let temp = [];
    for(let j = 0; j < key.length; j++){



        temp.push(<td contenteditable={'false'}>{product[i][key[j]]}</td>);





    }





      row.push(
        <tr  class='tr-hover-class'>
        {temp}
        </tr>

      );







  }

  if(datalength < 10){

    for(let i = 0; i < 10 - datalength; i++){
      let temp = [];
      for(let j = 0; j < key.length; j++){
        temp.push(<td><div contenteditable={'false'}>--</div></td>);

      }

      temp.push(<td><div contenteditable={'false'}>--</div></td>);
      temp.push(<td><div contenteditable={'false'}>--</div></td>);

      row.push(
        <tr  class='tr-hover-class'>
        {temp}
        </tr>
      );
    }
  }

  return row;

}
