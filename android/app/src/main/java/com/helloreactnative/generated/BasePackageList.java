package ovh.dawndash.giveyourthings.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.appauth.AppAuthPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.google.signin.GoogleSignInPackage(),
        new expo.modules.permissions.PermissionsPackage()
    );
  }
}
