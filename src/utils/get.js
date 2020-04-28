import { getAll } from './rc';
import downloadGit from 'download-git-repo';

export const downloadLocal = async (templateName, projectName) => {
  let config = await getAll();
  let api =
    config.type === 'directRegistry'
      ? `direct:${config.registry}`
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
