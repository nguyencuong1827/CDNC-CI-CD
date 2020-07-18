import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import static com.kms.katalon.core.testobject.ObjectRepository.findWindowsObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.cucumber.keyword.CucumberBuiltinKeywords as CucumberKW
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
// import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('https://tutor-reactjs.firebaseapp.com/home')

WebUI.click(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/a_Sign in'))

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/input__email'), 'huyconx@gmail.com')

WebUI.setEncryptedText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/input__password'), 'aeHFOx8jV/A=')

WebUI.click(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/span_Sign In'))

WebUI.click(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/a_Profile'))

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tram lan'), 'mot con nguoi tram lan')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tram la'), 'mot con nguoi tram la')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tram l'), 'mot con nguoi tram l')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tram'), 'mot con nguoi tram ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tram_1'), 'mot con nguoi tram')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tra'), 'mot con nguoi tra')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi tr'), 'mot con nguoi tr')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi t'), 'mot con nguoi t')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi'), 'mot con nguoi ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguoi_1'), 'mot con nguoi')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con nguo'), 'mot con nguo')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con ngu'), 'mot con ngu')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con ng'), 'mot con ng')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con n'), 'mot con n')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con'), 'mot con ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot con_1'), 'mot con')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot co'), 'mot co')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot c'), 'mot c')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot'), 'mot ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mot_1'), 'mot')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_mo'), 'mo')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_m'), 'm')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea__overview'), '')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_h'), 'h')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_he'), 'he')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hel'), 'hel')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hell'), 'hell')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello'), 'hello')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello_1'), 'hello ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello d'), 'hello d')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello da'), 'hello da')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day'), 'hello day')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day_1'), 'hello day ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day l'), 'hello day l')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la'), 'hello day la')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la_1'), 'hello day la ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la c'), 'hello day la c')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la co'), 'hello day la co')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la con'), 'hello day la con')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la con_1'), 'hello day la con ')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la con n'), 'hello day la con n')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la con na'), 'hello day la con na')

WebUI.setText(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/textarea_hello day la con nai'), 'hello day la con nai')

WebUI.click(findTestObject('Object Repository/Change_OverView/Page_Uber for tutor/span_Update'))

