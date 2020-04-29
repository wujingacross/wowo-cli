import { getAll } from './rc';
import downloadGit from 'download-git-repo';

export const downloadLocal = async (templateName, projectName) => {
  let config = await getAll();
  let api =
    config.type === 'directRegistry'
      ? `direct:${templateName || config.registry}`
      : `${config.registry}/${templateName}`;
  return new Promise((resolve, reject) => {
    downloadGit(
      api,
      projectName,
      config.type === 'directRegistry' ? { clone: true } : {},
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

export const downloadByTemplateUrl = async (templateUrl, projectName) => {
  let config = await getAll();
  let api = `direct:${templateUrl}`;
  return new Promise((resolve, reject) => {
    downloadGit(api, projectName, { clone: true }, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};
