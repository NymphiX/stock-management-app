import { mergeResolvers } from '@graphql-tools/merge';
import productResolver from './productResolver';
import warehouseResolver from './warehouseResolver';
import importExportResolver from './importExportResolver';

const resolvers = mergeResolvers([productResolver, warehouseResolver, importExportResolver]);

export default resolvers;