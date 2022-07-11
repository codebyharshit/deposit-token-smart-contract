var provider = new ethers.providers.Web3Provider(window.ethereum);
let signer; 
let address;// = "0xE66D2189B12214Fd7c8e9De984cF1463e97e5806";

async function Connect(){
		if (typeof window.ethereum !== "undefined") {
		  try {
			await ethereum.request({ method: "eth_requestAccounts" });
		  } catch (error) {
			console.log(error);
		  }
		  $("#connect").text("Connected");
		} else {
		  $("#connect").text("Metamask not found");
		}
}

async function deployContract(){
    const adres1 = $("#address1").val();
    const adres2 = $("#address2").val();
    signer = await provider.getSigner();
    //const abi & byteCode define in abi.js
    const factory = new ethers.ContractFactory(abi, byteCode, signer);
    const ethTransfer = await factory.deploy(adres1, adres2);
    const tx = await ethTransfer.deployTransaction.wait();
    console.log("Deploy completed", tx);
	$("#deployStatus").text("Newly deployed contract address is:\n" + ethTransfer.address);
}
/*
async function contBal(){
	address = $("#cAdres").val();
	const bal = await provider.getBalance(address);
	console.log("Contract Balance:", ethers.utils.formatEther(bal));
	$("#contractBalance").text
	("Contract Balance: " + ethers.utils.formatEther(bal) + " ether");
	//setInterval(contBal(), 1000);
}
*/	

function balance(){
	address = $("#cAdres").val();
	console.log("cAdres: ", address);
	const contract = new ethers.Contract(address, abi, provider);
	contract.getBalances().then(function(value) {
		$("#contractBalance").text("Contract Balance: "+ethers.utils.formatEther(value[0])+" ether");
		$("#fatherBalance").text("Father Balance: "+ethers.utils.formatEther(value[1])+" ether");
		$("#sonBalance").text("Son Balance: "+ethers.utils.formatEther(value[2])+" ether");
	console.log(value.toString());
	getAllowance();
	})
}

async function allowance(){
	try{
	signer = await provider.getSigner();
	console.log("Account address s:", await signer.getAddress());
	const contract = new ethers.Contract(address, abi, signer);	
	$("#txStatus").text("Transaction in progress...");
	var inputval = $("#amount").val();
	var inputValue = ethers.utils.parseEther(inputval);
	const tx = await contract.connect(signer).approveAllowance(inputValue);
	await tx.wait();
	console.log(tx);
	$("#txStatus").text("Transaction Completed");
	balance();
	}catch(err){$("#txStatus").text("Error Occurred...", alert(err.message))}
}

async function deposit(){
	try{
	signer = await provider.getSigner();
	console.log("Account address s:", await signer.getAddress());
	const contract = new ethers.Contract(address, abi, signer);	
	var inputval = $("#amount").val();
	var inputValue = {value: ethers.utils.parseEther(inputval)};
	$("#txStatus").text("Transaction in progress...");
	const tx = await contract.connect(signer).deposit(inputValue);
	await tx.wait();
	console.log(tx);
	$("#txStatus").text("Transaction completed");
	balance();
	}catch(err){$("#txStatus").text("Error Occurred...", alert(err.message))}
}
	
async function withdraw(){
	try{
	signer = await provider.getSigner();
	console.log("Account address s:", await signer.getAddress());
	const contract = new ethers.Contract(address, abi, signer);	
	var inputval = $("#amount").val();
	var inputValue = ethers.utils.parseEther(inputval);
	$("#txStatus").text("Transaction in progress...");
	const tx = await contract.connect(signer).withdraw(inputValue);
	await tx.wait();
	console.log(tx);
	$("#txStatus").text("Transaction completed");
	balance();
	}catch(err){$("#txStatus").text("Error Occurred...", alert(err.message))}
}

async function getAllowance(){
	const contract = new ethers.Contract(address, abi, provider);
	contract.getAllowance().then(function(limit){
		console.log(limit);
		$("#allowLimit").text("Allowance Limit: " + ethers.utils.formatEther(limit) + " ether");
	});
}
