
load_orders = () => {
	let orders = JSON.parse(localStorage.getItem('orders'))
	table = document.createElement('table')
	tbody = document.createElement('tbody')
	table.className = "excel"

	let row = `<tr>
			<th>Номер</th>
			<th>Дата заказа</th>
			<th>Дата доставки</th>
			<th>Кол-во товаров</th>
			<th>Сумма доставки</th>
			<th>Общая сумма</th>
			<th>Статус</th>
			<th>Сборщик</th>
			<th>Курьер</th>
			<th>Пользователь</th>
			<th>Телефон</th>  
			<th>Адрес</th>  
			<th>Долгота</th>
			<th>Широта</th>
			<th>Комментарии</th>
		</tr>`
		tbody.innerHTML = tbody.innerHTML + row
	for (order of orders){
		comments = []
		if(order['eventLog'])
			for (comment of order['eventLog']){
				if( comment['isPublic'] ){
					comments.push(comment['data']['text'])
				}
			}
		packer = (order['packerUser'] !== undefined) ? order['packerUser']['name'] : undefined
		courier = order['courier'] !== undefined ? order['courier']['name'] : undefined
		let row = `<tr>
			<td>${order['id']}</td>
			<td>${order['regDT']}</td>
			<td>${order['deliveryDate']}</td>
			<td>${order['itemsCount']}</td>
			<td>${order['deliveryPrice']}</td>
			<td>${order['totalPrice']}</td>
			<td>${order['state']['actionDescr']}</td>
			<td>${packer}</td>
			<td>${courier}</td>
			<td>${order['user']['name']}</td>
			<td>${order['user']['cellPhone']}</td>
			<td>${order['addresseeName']}</td>
			<td>${order['targetLocation']['geometry']['coordinates'][0]}</td>
			<td>${order['targetLocation']['geometry']['coordinates'][1]}</td>
			<td>${comments.join(', ')}</td>
		</tr>`
		tbody.innerHTML = tbody.innerHTML + row
	}
	console.log(tbody.childNodes)
	for(child of tbody.childNodes){
		child.style.borderStyle = 'solid'
		child.style.borderWidth = '.5px'
		child.style.borderColor = 'black'
	}
	table.appendChild(tbody);
	return table
}

function exportTableToExcel(filename = 'reportOrder:'){
	authorization();
	setTimeout(1000);
	get_orders();
	setTimeout(1000);
    var downloadLink;
    var dataType_xls = 'application/vnd.ms-excel';
    var dataType_xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    // var tableSelect = document.getElementById(tableID);
    var tableSelect = load_orders();
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    // Specify file name
    date = new Date().toISOString();
    filename = filename + date + '.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType_xls
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType_xls + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}