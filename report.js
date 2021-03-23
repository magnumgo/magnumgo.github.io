function parameters(pageSize=15, startDate='', endDate=''){
	return `?pageId=0&pageSize=${pageSize}&merchantId=&stateGroupId=&startDate=${startDate}&endDate=${endDate}&packerUserId=&courierId=&deliveryPeriodId=&activeRow=&externalId=`
}

'https://ecom.magnum.kz/core/adminapp/order/?pageId=0&pageSize=15&merchantId=&stateGroupId=&startDate=2021-03-01&endDate=2021-03-02&packerUserId=&courierId=&deliveryPeriodId=&activeRow=&externalId='
'https://ecom.magnum.kz/core/adminapp/order/?pageId=0&pageSize=7073&merchantId=&stateGroupId=&startDate=2021-03-02&endDate=2021-03-10&packerUserId=&courierId=&deliveryPeriodId=&activeRow=&externalId='


function get_orders(){
	const STD_HEADERS = {
	  'Accept': '*/*',
	  'Content-Type': 'application/json',
	};

	token = localStorage.getItem('token')
	
	const orders = (token, param) => (
	  fetch(
	    'https://ecom.magnum.kz/core/adminapp/order/' + param,
	    {
	      method: 'GET',
	      headers: {...STD_HEADERS, "Authorization": token},
	    }
	  )
	);

	range = document.getElementsByTagName('input')[0].value
	console.log(range)
	start = range 
	end = range  
	orders(token, parameters(pageSize=7073,start,end))
		.then(
	      async response => {
	        if (response.status !== 200) {
	          let res = await response.json()
	          let errorDescr = res.errorDescr
	          alert(errorDescr)
	        } else {
	          response
	            .text()
	            .then(
	              value => {
	                const responseObject = JSON.parse(value);
					txt = JSON.stringify(responseObject['content'])
					localStorage.removeItem('orders');
					localStorage.setItem('orders', txt)
	              }
	            );
	        }
	      }
	    );
}