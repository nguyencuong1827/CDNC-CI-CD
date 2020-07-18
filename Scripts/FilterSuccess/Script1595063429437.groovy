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
import com.kms.katalon.core.windows.keyword.WindowsBuiltinKeywords as Windows
import internal.GlobalVariable as GlobalVariable
import org.openqa.selenium.Keys as Keys

WebUI.openBrowser('')

WebUI.navigateToUrl('https://tutor-reactjs.firebaseapp.com/home')

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/a_See more'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/input__mui-autocomplete-94107'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/li_Thnh ph Cn Th'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/input__mui-autocomplete-38487'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/li_Huyn Vnh Thnh'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/input__mui-autocomplete-32818'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/li_literature'))

WebUI.click(findTestObject('Object Repository/Page_Uber for tutor/span_OK'))

