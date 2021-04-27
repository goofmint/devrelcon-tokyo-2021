//=============================================================================
// RPG Maker MZ - DevRelCon Register
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc DevRelCon事前登録が終わった時に実行するプラグイン
 * @author Atsushi Nakatsugawa
 *
 * @param applicationKey
 * @desc NCMBのアプリケーションキー
 * @default *******************
 *
 * @param clientKey
 * @desc NCMBのクライアントキー
 * @default *******************
 *
 * @help DevRelConForm.js
 * このプラグインは、DevRelCon事前登録者がクイズに正解した際にリダイレクトする処理をします。
 * @command clear
 * @desc 正解時に実行します
 *
*/

(() => {
  const pluginName = 'DevRelConForm';
	const params = PluginManager.parameters(pluginName);
  let ncmb;
  (function(){
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = './js/plugins/ncmb.min.js';
    document.querySelector('head').appendChild(js);
    js.onload = () => {
      console.log(params);
      ncmb = new NCMB(params.applicationKey, params.clientKey);
      ncmb.User.loginAsAnonymous();
    }
  })();

  PluginManager.registerCommand(pluginName, 'clear', async (args) => {
    const user = ncmb.User.getCurrentUser();
    const Register = ncmb.DataStore('Register');
    const register = new Register;
    const acl = new ncmb.Acl;
    acl
      .setUserReadAccess(user, true)
      .setUserWriteAccess(user, true);
    await register
      .set('language', navigator.language)
      .set('userAgent', navigator.userAgent)
      .set('acl', acl)
      .save();
    location.href = `/form?id=${encodeURIComponent(register.objectId)}&s=${encodeURIComponent(ncmb.sessionToken)}`;
  });
})();
